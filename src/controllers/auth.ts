import { NextFunction, Request, Response } from "express";
import {
  generateRandomNumbers,
  returnJSONError,
  returnJSONSuccess,
  sendEmail,
} from "../utils/functions";
import { prisma } from "../prisma";
import { BadRequest } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import {
  validateAdminRegData,
  validateRegData,
  validateSellerRegData,
} from "../schema/users";
import { compareSync, hashSync } from "bcrypt";
import { InternalException } from "../exceptions/internal-exception";
import { NotFound } from "../exceptions/not-found";
import { CACHE_KEYS, clearCache } from "../middlewares/cache";
import { RequestUser } from "../types";
import { faker } from "@faker-js/faker";

// Helper function to generate random creation dates within the past 3 to 6 months
function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Create a list of sellers
const generateSellers = (numOfSellers: number) => {
  const sellers: any[] = [];
  const now = new Date();
  const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
  const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));

  for (let i = 0; i < numOfSellers; i++) {
    const seller = {
      email: faker.internet.email(),
      fullname: faker.person.fullName(),
      companyName: faker.company.name(),
      password: hashSync(faker.internet.password(), 10),
      telephone: faker.phone.number({ style: "international" }),
      country: "UK",
      city: faker.location.city(),
      street: faker.location.streetAddress(),
      postCode: faker.location.zipCode(),
      houseNumber: faker.location.buildingNumber(),
      createdAt: randomDate(sixMonthsAgo, threeMonthsAgo), // Backdate the account creation
    };
    sellers.push(seller);
  }
  return sellers;
};

const bulkCreateSellersFunction = async (sellers) => {
  for (const seller of sellers) {
    const existingUser = await prisma.user.findUnique({
      where: { email: seller.email },
    });

    // Ensure no duplicate emails are inserted
    if (!existingUser) {
      await prisma.user.create({
        data: {
          email: seller.email,
          fullname: seller.fullname,
          accountType: "SELLER",
          telephone: seller.telephone,
          password: seller.password,
          store: {
            create: {
              name: seller.companyName,
              description: faker.lorem.sentence(),
              location: seller.country,
            },
          },
          address: {
            create: {
              city: seller.city,
              country: seller.country,
              street: seller.street,
              postCode: seller.postCode,
              houseNumber: seller.houseNumber,
            },
          },
          createdAt: seller.createdAt, // Assign the backdated creation date
        },
      });
    }
  }
};

export const bulkCreateSellers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const quantity = req.body.quantity;
  // Execute the bulk creation
  bulkCreateSellersFunction(generateSellers(quantity))
    .then(() => console.log("Sellers created successfully"))
    .catch((error) => console.error("Error creating sellers:", error));
  // .finally(() => prisma.$disconnect());
};

export const accountStatus = (req: Request, res: Response) => {
  res.json(req.user);
};
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateRegData.parse(req.body);
  const findUser = await prisma.user.findFirst({
    where: { email: req.body.email },
  });

  if (!findUser) {
    let user = await prisma.user.create({
      data: {
        email: req.body.email as string,
        fullname: req.body.fullname,
        accountType: "BUYER",
        telephone: req.body.telephone,
        password: hashSync(req.body.password, 10),
        address: {
          create: {
            city: req.body.city,
            country: req.body.country,
            street: req.body.street,
            postCode: req.body.postCode,
            houseNumber: req.body.houseNumber,
          },
        },
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
    const id = await sendOtp(user.id, user.email);
    if (id) {
      return returnJSONSuccess(res, { userId: id });
    } else {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          status: "FAILED",
        },
      });
      next(
        new InternalException("Could'nt send mail", ErrorCode.MAIL_ERROR, null)
      );
    }
  } else {
    if (findUser.status !== "VERIFIED") {
      const id = await sendOtp(findUser.id, findUser.email);
      if (id) {
        return returnJSONSuccess(res, { userId: id });
      } else {
        await prisma.user.update({
          where: {
            id: findUser.id,
          },
          data: {
            status: "FAILED",
          },
        });
        next(
          new InternalException(
            "Could'nt send mail",
            ErrorCode.MAIL_ERROR,
            null
          )
        );
      }
    }
    next(new BadRequest("User already exist", ErrorCode.USER_ALREADY_EXIST));
  }
};
export const resendOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.query;
  if (id) {
    try {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          id: id as string,
        },
        select: {
          id: true,
          email: true,
          status: true,
        },
      });
      if (user.status !== "VERIFIED") {
        const userId = await sendOtp(user.id, user.email);
        if (userId) {
          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              status: "PENDING",
            },
          });
          return returnJSONSuccess(res, { userId: id });
        }
        next(
          new InternalException(
            "Could'nt send mail",
            ErrorCode.MAIL_ERROR,
            null
          )
        );
      } else {
        next(new BadRequest("Already verified", ErrorCode.BAD_REQUEST));
      }
    } catch (error) {
      next(new BadRequest("User not found", ErrorCode.BAD_REQUEST));
    }
  } else {
    next(new BadRequest("Invalid Request Parameters", ErrorCode.BAD_REQUEST));
  }
};
export const registerSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateSellerRegData.parse(req.body);
  const findUser = await prisma.user.findFirst({
    where: { email: req.body.email },
  });
  if (!findUser) {
    let user = await prisma.user.create({
      data: {
        email: req.body.email as string,
        fullname: req.body.fullname,
        accountType: "SELLER",
        telephone: req.body.telephone,
        password: hashSync(req.body.password, 10),
        store: {
          create: {
            name: req.body.companyName,
            description: "",
            location: req.body.country,
          },
        },
        address: {
          create: {
            city: req.body.city,
            country: req.body.country,
            street: req.body.street,
            postCode: req.body.postCode,
            houseNumber: req.body.houseNumber,
          },
        },
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
    const id = await sendOtp(user.id, user.email);
    if (id) {
      return returnJSONSuccess(res, { userId: id });
    } else {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          status: "FAILED",
        },
      });
      next(
        new InternalException("Could'nt send mail", ErrorCode.MAIL_ERROR, null)
      );
    }
  } else {
    if (findUser.status !== "VERIFIED") {
      const id = await sendOtp(findUser.id, findUser.email);
      if (id) {
        return returnJSONSuccess(res, { userId: id });
      } else {
        await prisma.user.update({
          where: {
            id: findUser.id,
          },
          data: {
            status: "FAILED",
          },
        });
        next(
          new InternalException(
            "Could'nt send mail",
            ErrorCode.MAIL_ERROR,
            null
          )
        );
      }
    }
    next(new BadRequest("User already exist", ErrorCode.USER_ALREADY_EXIST));
  }
};
export const registerAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateAdminRegData.parse(req.body);
  const findUser = await prisma.user.findFirst({
    where: { email: req.body.email },
  });
  if (!findUser) {
    let user = await prisma.user.create({
      data: {
        email: req.body.email as string,
        fullname: req.body.fullname,
        accountType: "ADMIN",
        telephone: req.body.telephone,
        password: hashSync(req.body.password, 10),
        address: {
          create: {
            city: req.body.city,
            country: req.body.country,
            street: req.body.street,
            postCode: req.body.postCode,
            houseNumber: req.body.houseNumber,
          },
        },
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
    const id = await sendOtp(user.id, user.email);
    if (id) {
      return returnJSONSuccess(res, { userId: id });
    } else {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          status: "FAILED",
        },
      });
      next(
        new InternalException("Could'nt send mail", ErrorCode.MAIL_ERROR, null)
      );
    }
  } else {
    if (findUser.status !== "VERIFIED") {
      const id = await sendOtp(findUser.id, findUser.email);
      if (id) {
        return returnJSONSuccess(res, { userId: id });
      } else {
        await prisma.user.update({
          where: {
            id: findUser.id,
          },
          data: {
            status: "FAILED",
          },
        });
        next(
          new InternalException(
            "Could'nt send mail",
            ErrorCode.MAIL_ERROR,
            null
          )
        );
      }
    }
    next(new BadRequest("User already exist", ErrorCode.USER_ALREADY_EXIST));
  }
};
export const loginAuthError = (req: Request, res: Response) => {
  let message = req.flash("error");
  res.status(message[1] ? +message[1] : 401).json({
    status: false,
    message: message[0] ? message[0] : "Something went wrong",
    errorCode: message[2] ? +message[2] : ErrorCode.BAD_REQUEST,
  });
};
export const googleAuthError = (req: Request, res: Response) => {
  let message = req.flash("error");
  res.status(401).json({
    status: false,
    message: message[0],
  });
};
const sendOtp = async (id: string, email: string) => {
  const otp = generateRandomNumbers(5);
  let minuteToExpire = 300000; // 5 mins
  if (id) {
    const otpUser = await prisma.verifyUser.upsert({
      where: {
        userId: id,
      },
      update: {
        userId: id,
        expiresAt: new Date(Date.now() + minuteToExpire),
        otp: hashSync("" + otp, 10),
      },
      create: {
        userId: id,
        expiresAt: new Date(Date.now() + minuteToExpire),
        otp: hashSync("" + otp, 10),
      },

      select: {
        id: true,
      },
    });
    const mailResponse = await sendEmail(
      "Rayvvin Team",
      "Welcome to Rayvvin.",
      email,
      `<p>Welcome to Rayvvin. Please verify your account using the One Time Password provided below. <p><b>${otp}</b></p>. This OTP expires in 5 minutes. <br/>
      Best Regard.
      <br /> 
      Rayvvin Team</p>`
    );
    if (mailResponse.status) {
      return id;
    } else {
      await prisma.verifyUser.delete({
        where: {
          id: otpUser.id,
        },
      });
    }
  }
};
export const verifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, code }: { id: string; code: string } = req.body;

  if (id && code) {
    try {
      const otp = await prisma.verifyUser.findFirstOrThrow({
        where: {
          userId: id,
        },
      });
      if (!compareSync(code, otp.otp)) {
        return returnJSONError(res, { message: "Wrong Code" }, 401);
      }
      if (otp.expiresAt.valueOf() < new Date().valueOf()) {
        // otp expired
        await prisma.$transaction([
          prisma.user.update({
            where: {
              id: otp.userId,
            },
            data: {
              status: "FAILED",
            },
          }),
          prisma.verifyUser.delete({
            where: {
              userId: otp.userId,
            },
          }),
        ]);
        return returnJSONError(res, { message: "OTP expired" }, 401);
      } else {
        let [user, _] = await prisma.$transaction([
          prisma.user.update({
            where: {
              id: otp.userId,
            },
            data: {
              status: "VERIFIED",
            },
            select: {
              id: true,
              email: true,
              accountType: true,
            },
          }),
          prisma.verifyUser.delete({
            where: {
              userId: otp.userId,
            },
          }),
        ]);
        req.logIn(user, function (err) {
          if (err) {
            throw err;
          }
          return res.status(200).json({ status: true, ...req.user });
        });
      }
    } catch (error) {
      next(new NotFound("Failed to find OTP", ErrorCode.NOT_FOUND));
    }
  } else {
    next(new BadRequest("Invalid Request Parameters", ErrorCode.BAD_REQUEST));
  }
};
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as RequestUser;
  clearCache(CACHE_KEYS.USER_ADDRESS + user.id);
  clearCache(CACHE_KEYS.USER_ORDERS + user.id);
  clearCache(CACHE_KEYS.USER_DELIVERED_ORDERS + user.id);
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ status: true });
  });
};
export const localLoginSuccess = async (req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: true, message: "Login Successful", data: req.user });
};
export const googleLoginSuccess = async (req: Request, res: Response) => {
  res.redirect(
    `${process.env.CLIENT_URL}${
      (req.user as RequestUser).accountType === "SELLER" ? "/seller" : "/"
    }`
  );
};

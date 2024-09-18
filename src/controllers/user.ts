import { Request, Response } from "express";
import { prisma } from "../prisma";
import { RequestUser } from "../types";
import { returnJSONSuccess } from "../utils/functions";
import { CACHE_KEYS, clearCache } from "../middlewares/cache";
import {
  Address,
  validateAddress,
  validateMessage,
  validateProductMessage,
} from "../schema/users";

export const getLoggedusersAddress = async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  req.apicacheGroup = CACHE_KEYS.USER_ADDRESS + user.id;
  const address = await prisma.address.findFirst({
    where: {
      userId: user.id,
    },
  });

  return returnJSONSuccess(res, { data: address });
};

export const getLoggeduser = async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  req.apicacheGroup = CACHE_KEYS.USER_ADDRESS + user.id;
  const userData = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
  });

  return returnJSONSuccess(res, { data: userData });
};

export const updateuserAddress = async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  let validated = validateAddress.parse(req.body);
  let data: Address = { city: "" };
  validated.city && (data.city = validated.city);
  validated.street && (data.street = validated.street);
  validated.houseNumber && (data.houseNumber = validated.houseNumber);
  validated.postCode && (data.postCode = validated.postCode);
  validated.country && (data.country = validated.country);
  await prisma.address.upsert({
    where: {
      userId: user.id,
    },
    update: data,
    create: {
      ...data,
      userId: user.id,
    },
  });
  clearCache(CACHE_KEYS.USER_ADDRESS + user.id);
  returnJSONSuccess(res);
};
export const messageSeller = async (req: Request, res: Response) => {
  const message = validateMessage.parse(req.body.message);
  const { id } = req.params;
  const user = req.user as RequestUser;
  let mess = await prisma.sellerMessage.create({
    data: {
      message: message,
      from: "USER",
      userId: user.id,
      storeId: id,
    },
    select: {
      store: {
        select: {
          userId: true,
        },
      },
    },
  });
  clearCache(CACHE_KEYS.STORE_MESSAGES + mess.store.userId);
  clearCache(CACHE_KEYS.STORE_ABOUT + mess.store.userId);

  returnJSONSuccess(res);
};
export const messageSellerForProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const validated = validateProductMessage.parse(req.body);
  const user = req.user as RequestUser;
  const mess = await prisma.sellerMessage.create({
    data: {
      message: validated.message,
      from: "USER",
      userId: user.id,
      storeId: id,
      productId: validated.productId,
    },
    select: {
      store: {
        select: {
          userId: true,
        },
      },
    },
  });
  clearCache(CACHE_KEYS.STORE_MESSAGES + mess.store.userId);
  clearCache(CACHE_KEYS.STORE_ABOUT + mess.store.userId);
  returnJSONSuccess(res);
};

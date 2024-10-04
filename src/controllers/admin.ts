import { NextFunction, Request, Response } from "express";
import { validateAcceptPayment } from "../schema/admin";
import { prisma } from "../prisma";
import { returnJSONError, returnJSONSuccess } from "../utils/functions";
import { NotFound } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { CACHE_KEYS, clearCache } from "../middlewares/cache";
import { extendOrderAmount } from "../prisma/extensions";
import { validatePagination } from "../schema/categories";
import { RequestUser } from "../types";
import { faker } from "@faker-js/faker";
import { parse } from "csv-parse";
import fs from "fs";
import { format, subMonths } from "date-fns";
import moment from "moment";

// Define types for the product data from CSV
interface Product {
  name: string;
  main_category: string;
  sub_category: string;
  image: string;
  actual_price: string;
  discount_price: string | null;
}

// Load CSV data with proper typing
const loadCSVData = async (filePath: string): Promise<Product[]> => {
  const products: Product[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(parse({ columns: true }))
      .on("data", (row: Product) => {
        products.push(row);
      })
      .on("end", () => {
        resolve(products);
      })
      .on("error", reject);
  });
};

// Add products to sellers' stores
const bulkAddProducts = async (csvFilePath: string) => {
  try {
    // Load product data from CSV
    const productData: Product[] = await loadCSVData(csvFilePath);

    // Fetch sellers based in the UK
    let sellers = await prisma.user.findMany({
      where: {
        accountType: "SELLER",
        address: {
          country: "UK",
        },
      },
      select: {
        id: true,
        createdAt: true,
        store: {
          select: {
            id: true,
          },
        },
      },
    });

    sellers = sellers.slice(0, 1);

    // Iterate over each seller and assign products
    for (const seller of sellers) {
      const { id: userId, createdAt: accountCreatedAt, store } = seller;
      const storeId = store?.id;

      if (!storeId) continue;

      // Assign random number of products (e.g., between 5 and 20)
      const numberOfProducts = Math.floor(Math.random() * 16) + 5;

      for (let i = 0; i < numberOfProducts; i++) {
        const randomProduct =
          productData[Math.floor(Math.random() * productData.length)];
        const {
          name,
          main_category,
          sub_category,
          image,
          actual_price,
          discount_price,
        } = randomProduct;

        // Check if product already exists in the store to avoid duplicates
        const existingProduct = await prisma.product.findFirst({
          where: {
            storeId,
            name,
          },
        });

        if (existingProduct) {
          console.log(`Skipping duplicate product: ${name}`);
          continue;
        }

        // Check if the category exists
        let category = await prisma.category.findUnique({
          where: { name: main_category }, // Look up by category name
        });

        // Create the category if it doesn't exist
        if (!category) {
          category = await prisma.category.create({
            data: {
              name: main_category,
            },
          });
          console.log(`Created new category: ${main_category}`);
        }

        // Generate a random creation date between seller's account creation date and now
        const productCreationDate = format(
          new Date(
            accountCreatedAt.getTime() +
              Math.random() * (Date.now() - accountCreatedAt.getTime())
          ),
          "yyyy-MM-dd"
        );

        // Set amount: if actual_price is 0, choose a random price between 2 and 10
        let amount: number; // Declare amount as a number

        if (parseFloat(actual_price) > 0) {
          amount = parseFloat(actual_price);
        } else {
          amount = parseFloat((Math.random() * (10 - 2) + 2).toFixed(2)); // Ensure this is a number
        }
        let discountPercentage = 0;
        if (discount_price) {
          const actualPriceFloat = parseFloat(actual_price);
          if (actualPriceFloat > 0) {
            discountPercentage =
              ((actualPriceFloat - parseFloat(discount_price)) /
                actualPriceFloat) *
              100;
          }
        }

        // Create the product in the seller's store
        await prisma.product.create({
          data: {
            name,
            itemCondition: "NEW", // Assuming all products are new
            amount, // Use the calculated amount
            discount: discount_price ? true : false,
            discountPercentage: discountPercentage,
            quantity: Math.floor(Math.random() * 100) + 1,
            coverImage: image,
            details: `${main_category} - ${sub_category}`,
            store: {
              connect: {
                id: storeId, // Use the existing store ID to connect
              },
            },
            createdAt: new Date(productCreationDate),
            publish: true,
            categories: {
              connect: {
                id: category.id, // Use the found or newly created category ID
              },
            },
          },
        });

        console.log(`Product ${name} added to store ${storeId}`);
      }
    }
  } catch (error) {
    console.error("Error bulk adding products:", error);
  }
};

async function generateEngagementData(months = 6) {
  let startDate = moment().subtract(months, "months");
  const endDate = moment();

  while (startDate.isBefore(endDate)) {
    await prisma.engagement.create({
      data: {
        date: startDate.toDate(),
        dailyUsers: faker.number.int({ min: 50, max: 300 }),
        interactions: faker.number.int({ min: 100, max: 1000 }),
      },
    });
    startDate.add(1, "day");
  }

  console.log("Engagement data generated.");
}

async function generateHashtagRankings() {
  const hashtags = ["#sale", "#promo", "#event", "#new", "#trending"];

  for (const tag of hashtags) {
    await prisma.hashtagRanking.create({
      data: {
        hashtag: tag,
        frequency: faker.number.int({ min: 10, max: 300 }),
      },
    });
  }

  console.log("Hashtag rankings generated.");
}

async function generateMarketingData(months = 6) {
  let startDate = moment().subtract(months, "months");
  const endDate = moment();

  while (startDate.isBefore(endDate)) {
    // Generate for SEO
    await prisma.marketingActivity.create({
      data: {
        type: "SEO",
        clicks: faker.number.int({ min: 500, max: 5000 }),
        impressions: faker.number.int({ min: 10000, max: 50000 }),
        conversions: faker.number.int({ min: 50, max: 500 }),
        costPerClick: parseFloat(faker.commerce.price({ min: 0.1, max: 2 })),
        openRate: faker.number.float({ min: 10, max: 50 }),
        clickRate: faker.number.float({ min: 1, max: 10 }),
        date: startDate.toDate(),
      },
    });

    // Generate for PPC
    await prisma.marketingActivity.create({
      data: {
        type: "PPC",
        clicks: faker.number.int({ min: 100, max: 1000 }),
        impressions: faker.number.int({ min: 5000, max: 20000 }),
        conversions: faker.number.int({ min: 10, max: 100 }),
        costPerClick: parseFloat(faker.commerce.price({ min: 0.5, max: 5 })),
        openRate: faker.number.float({ min: 5, max: 30 }),
        clickRate: faker.number.float({ min: 0.5, max: 5 }),
        date: startDate.toDate(),
      },
    });

    // Generate for Email Marketing
    await prisma.marketingActivity.create({
      data: {
        type: "Email",
        clicks: faker.number.int({ min: 50, max: 500 }),
        impressions: faker.number.int({ min: 1000, max: 10000 }),
        conversions: faker.number.int({ min: 5, max: 100 }),
        costPerClick: parseFloat(faker.commerce.price({ min: 0.1, max: 2 })),
        openRate: faker.number.float({ min: 10, max: 50 }),
        clickRate: faker.number.float({ min: 1, max: 10 }),
        date: startDate.toDate(),
      },
    });

    startDate.add(7, "days"); // Generate weekly data
  }

  console.log("Marketing data generated.");
}


export const generateProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Generating Products");
  bulkAddProducts("src/utils/All Grocery and Gourmet Foods.csv");
};

export const approvePaymentByAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { orderId } = req.body;
  let store;
  try {
    store = await prisma.store.findFirstOrThrow({
      where: {
        id,
      },
      select: {
        sellerDashboard: true,
        userId: true,
      },
    });
  } catch (error) {
    next(new NotFound("Store not found", ErrorCode.NOT_FOUND));
  }
  validateAcceptPayment.parse({ id, orderId });
  const deliveryUpdate = await prisma.orderDetails.findMany({
    where: {
      AND: [{ orderId: orderId }, { status: "DELIVERED" }, { storeId: id }],
    },
  });
  if (deliveryUpdate) {
    const alreadyPaid = await prisma.sellerPaymentHistory.findUnique({
      where: {
        storeId_orderId: {
          orderId: orderId,
          storeId: id,
        },
      },
    });
    if (!alreadyPaid) {
      const amount = deliveryUpdate
        .map(
          (details) => details.amount * details.quantity + details.shippingFee
        )
        .reduce((x, y) => x + y, 0);

      await prisma.sellerDashboard.upsert({
        where: {
          storeId: id,
        },
        update: {
          amount: {
            increment: amount,
          },
          payment: {
            create: {
              orderId: orderId,
              storeId: id,
              amount: amount,
            },
          },
        },
        create: {
          amount: amount,
          storeId: id,
          payment: {
            create: {
              orderId: orderId,
              storeId: id,
              amount: amount,
            },
          },
        },
      });
      clearCache(CACHE_KEYS.STORE_ABOUT + store?.userId);
      clearCache(CACHE_KEYS.STORE_TRANSACTIONS + store?.userId);
      return returnJSONSuccess(res);
    } else {
      return returnJSONError(res, { message: "Order already paid out" });
    }
  } else {
    return returnJSONError(res, { message: "Order not delivered" });
  }
};

export const adminGetOrders = async (req: Request, res: Response) => {
  const { _limit, _page } = req.query;
  const user = req.user! as RequestUser;
  const validatedPag = validatePagination.safeParse({
    _page: +_page!,
  });
  req.apicacheGroup = CACHE_KEYS.USER_ORDERS + user.id;
  const count = await prisma.order.count({
    // where: { userId: user.id }
  });
  const page = (+validatedPag.data?._page! - 1) * (_limit ? +_limit : count);
  const orders = await prisma.$extends(extendOrderAmount()).order.findMany({
    skip: page,
    take: +_limit! || undefined,
    where: {
      AND: [
        // { userId: user.id },
        { paymentStatus: true },
      ],
    },
    select: {
      id: true,
      orderId: true,
      amount: true,
      datePaid: true,
      orderDetails: {
        select: {
          status: true,
          quantity: true,
          id: true,
          amount: true,
          shippingFee: true,
          product: {
            select: {
              name: true,
              id: true,
              details: true,
              itemCondition: true,
              coverImage: true,
              views: true,
              store: {
                select: {
                  name: true,
                  id: true,
                  image: true,
                },
              },
              createdAt: true,
              quantity: true,
            },
          },
        },
      },
    },
  });
  returnJSONSuccess(res, {
    data: orders,
    totalPages: Math.ceil(count / (_limit ? +_limit : count)),
    hasMore: validatedPag.data?._page! * (_limit ? +_limit : count) < count,
  });
};

export const adminGetUsers = async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  req.apicacheGroup = CACHE_KEYS.USER_ADDRESS + user.id;
  const users = await prisma.user.findMany({
    // where: {
    //   id: user.id,
    // },
  });

  return returnJSONSuccess(res, { data: users });
};

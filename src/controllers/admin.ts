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
const reviewTexts = [
  "Amazing product! Exceeded my expectations.",
  "Good quality, fast delivery. Highly recommend!",
  "I'm very satisfied with my purchase.",
  "Great value for money. Will buy again!",
  "The product is decent, but the delivery was slow.",
  "Not bad, but I expected a bit more.",
  "Excellent product! Works as described.",
  "Good, but there's room for improvement.",
  "This is my second purchase, and I'm still impressed.",
  "Product arrived in perfect condition. Very happy with it.",
  "Quality is top-notch! I'm loving it.",
  "Packaging was good, but the product wasn't as described.",
  "Very useful! Would definitely recommend.",
  "Fantastic service and a great product!",
  "It works okay, but there were some issues.",
  "Not worth the price, unfortunately.",
  "I'm happy with the product, but it took too long to arrive.",
  "Five stars! I'll be buying from this seller again.",
  "The product met my needs perfectly.",
  "Decent quality, but I found it cheaper elsewhere.",
  "Delivery was quick and the product works as expected.",
  "Amazing service, and the product is of high quality.",
  "A bit disappointed with the quality.",
  "The product broke after a few uses, but customer service was helpful.",
  "I wasn't sure at first, but this product is worth every penny.",
  "It does the job, but nothing extraordinary.",
  "High quality and affordable price. Very satisfied!",
  "This was exactly what I was looking for!",
  "Not great. I wouldn't buy this again.",
  "Superb product! Well-built and durable.",
  "I received the wrong item, but the seller handled it well.",
  "I’ve been using it for a week now, and it’s working perfectly.",
  "Product is okay, but I had better experiences with other brands.",
  "It didn't work for me, unfortunately.",
  "Best purchase I've made this year!",
  "Works fine, but not as advertised.",
  "Highly satisfied. This product made my life easier.",
  "This product is a game-changer!",
  "Poor quality. Not worth the hype.",
  "It does what it says. No complaints.",
  "Excellent! Would highly recommend to friends and family.",
  "Product was damaged on arrival, but still works fine.",
];


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

export const fetchSEOPPC = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Fetching");
  try {
    const marketingActivities = await prisma.marketingActivity.findMany({
      orderBy: {
        date: "asc",
      },
    });

    return returnJSONSuccess(res, { data: marketingActivities });
  } catch (error) {
    console.error(error);
    return returnJSONError(res, {
      message: "Error fetching marketing activities",
    });
  }
};

export const generateSEOPPC = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Generating SEO & PPC Data");
  generateMarketingData().catch((e) => console.error(e));
};

export const generateBackdatedOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Generating backdated orders");

    // Get the number of orders from the request body or query params
    const { numberOfOrders } = req.body;

    if (!numberOfOrders || isNaN(numberOfOrders)) {
      return res.status(400).json({
        message: "Invalid or missing number of orders",
      });
    }

    // Call the createBackdatedOrders function and await the result
    await createBackdatedOrders(numberOfOrders);

    // Respond to the client indicating the orders were created
    res.status(200).json({
      message: `${numberOfOrders} backdated orders successfully created`,
    });
  } catch (error) {
    console.error("Error generating backdated orders:", error);
    next(error); // Pass error to the next middleware for handling
  }
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

// Helper function to generate a random date in the last 3 months
const randomDateInLastThreeMonths = () => {
  const startDate = subMonths(new Date(), 3); // 3 months ago
  const endDate = new Date(); // Today
  const randomDate = new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
  return randomDate;
};

const createBackdatedOrders = async (numberOfOrders: number) => {
  // Fetch all buyers and sellers
  const buyers = await prisma.user.findMany({ where: { accountType: 'BUYER' } });
  const sellers = await prisma.user.findMany({
    where: { accountType: 'SELLER' },
    include: {
      store: true, // This includes the store relation for each seller
    },
  });

  for (let i = 0; i < numberOfOrders; i++) {
    console.log(`Creating Order ${i}`);
    const buyer = buyers[Math.floor(Math.random() * buyers.length)];
    const seller = sellers[Math.floor(Math.random() * sellers.length)];

    // Check if the seller has a store before proceeding
    if (!seller.store) {
      console.log(`Seller ${seller.fullname} has no store, skipping...`);
      continue; // Skip to the next iteration if the store is null
    }

    // Fetch available products, filtering for cheaper items (e.g., groceries or small-priced products)
    const products = await prisma.product.findMany({
      where: { storeId: seller.store.id, quantity: { gt: 0 }, amount: { lte: 50 } }, // Prioritize cheaper items
      orderBy: { amount: 'asc' }, // Sort by price ascending
    });

    if (products.length === 0) continue; // Skip if no available products

    // Set the maximum order total
    const MAX_ORDER_TOTAL = 300;
    let totalAmount = 0;
    const orderDetailsData = [] as any[];

    // Randomize the number of unique products, capped at 8
    const numUniqueProducts = Math.min(Math.floor(Math.random() * 8) + 1, products.length);

    // Shuffle products to ensure randomness
    const shuffledProducts = products.sort(() => 0.5 - Math.random());

    for (const product of shuffledProducts) {
      // Stop adding products if the total amount is close to $200
      if (totalAmount >= MAX_ORDER_TOTAL) break;

      // Generate a random quantity between 1 and the available stock for each product
      const randomQuantity = Math.floor(Math.random() * 8) + 1;
      const finalQuantity = Math.min(randomQuantity, product.quantity);

      // Calculate the potential amount for this product (based on quantity)
      const productAmount = product.amount * finalQuantity;

      // Check if adding this product will exceed $200
      if (totalAmount + productAmount > MAX_ORDER_TOTAL) {
        // If adding the full quantity will exceed the limit, adjust the quantity
        const remainingAmount = MAX_ORDER_TOTAL - totalAmount;
        const adjustedQuantity = Math.floor(remainingAmount / product.amount);
        if (adjustedQuantity > 0) {
          const adjustedProductAmount = product.amount * adjustedQuantity;
          const interest = adjustedProductAmount * 0.05;

          // Add this adjusted product to the order details
          orderDetailsData.push({
            amount: adjustedProductAmount,
            quantity: adjustedQuantity,
            productId: product.id,
            storeId: seller.store.id,
            shippingFee: seller.store.shippingFee,
            interest,
          });

          // Increment the total amount
          totalAmount += adjustedProductAmount;

          // Decrease product quantity after order is created
          await prisma.product.update({
            where: { id: product.id },
            data: { quantity: { decrement: adjustedQuantity } },
          });
        }
        break; // Stop after adding this product
      } else {
        // Add the product with full quantity to the order
        const interest = productAmount * 0.05;

        // Add this product to the order details
        orderDetailsData.push({
          amount: productAmount,
          quantity: finalQuantity,
          productId: product.id,
          storeId: seller.store.id,
          shippingFee: seller.store.shippingFee,
          interest,
        });

        // Increment the total amount
        totalAmount += productAmount;

        // Decrease product quantity after order is created
        await prisma.product.update({
          where: { id: product.id },
          data: { quantity: { decrement: finalQuantity } },
        });
      }
    }

    const orderDate = randomDateInLastThreeMonths();

    // Create the order for the buyer with the backdated creation date
    if (totalAmount > 0) {
      const order = await prisma.order.create({
        data: {
          orderId: generateRandomNumbers(7), // Function that generates random order IDs
          amount: totalAmount, // Total amount for all products in the order
          userId: buyer.id,
          createdAt: orderDate,
          updatedAt: orderDate,
          paymentStatus: true, // Assuming payment was successful
          datePaid: orderDate,
          orderDetails: {
            create: orderDetailsData, // Create multiple order details
          },
        },
      });

      console.log(`Created order with ID ${order.id} for buyer ${buyer.fullname} with total amount ${totalAmount}`);
    }
  }
  console.log(`Order Generation Completed`);
};


// Function to generate random numbers for orderId
const generateRandomNumbers = (length: number) => {
  return parseInt(
    Math.floor(Math.random() * Math.pow(10, length))
      .toString()
      .padStart(length, "0")
  );
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


import { PrismaClient } from "@prisma/client";
import { subMonths, isBefore, format, addDays } from 'date-fns';

const prisma = new PrismaClient();

// Function to simulate product views
export const simulateProductViews = async () => {
  const users = await prisma.user.findMany({
    where: {
      accountType: 'BUYER',
    },
    select: {
      id: true,
      createdAt: true,
    },
  });

  const products = await prisma.product.findMany({
    where: {
      publish: true,
    },
    select: {
      id: true,
      createdAt: true,
    },
  });

  for (const user of users) {
    const { id: userId, createdAt: userCreatedAt } = user;

    // Limit product views to the signup date of the user
    const eligibleProducts = products.filter((product) =>
      isBefore(new Date(product.createdAt), new Date())
    );

    for (const product of eligibleProducts) {
      const randomDate = format(
        addDays(
          subMonths(new Date(), Math.random() * 6),
          Math.floor(Math.random() * 30)
        ),
        "yyyy-MM-dd"
      );

      // Avoid duplicates
      const existingView = await prisma.viewsTracker.findFirst({
        where: {
          userId,
          productId: product.id,
        },
      });

      if (!existingView) {
        await prisma.viewsTracker.create({
          data: {
            userId,
            productId: product.id,
            viewedAt: new Date(randomDate),
          },
        });
      }
    }
  }
};


export const simulateProductRatingsAndReviews = async () => {
  const users = await prisma.user.findMany({
    where: {
      accountType: "BUYER",
    },
    select: {
      id: true,
      createdAt: true,
    },
  });

  const products = await prisma.product.findMany({
    where: {
      publish: true,
    },
    select: {
      id: true,
      createdAt: true,
    },
  });

  for (const user of users) {
    const { id: userId, createdAt: userCreatedAt } = user;

    const eligibleProducts = products.filter((product) =>
      isBefore(new Date(product.createdAt), new Date())
    );

    for (const product of eligibleProducts) {
      const randomDate = format(
        addDays(
          subMonths(new Date(), Math.random() * 6),
          Math.floor(Math.random() * 30)
        ),
        "yyyy-MM-dd"
      );

      // Check if the user has already left a rating for the product
      const existingRating = await prisma.rating.findFirst({
        where: {
          userId,
          orderDetails: {
            productId: product.id,
          },
        },
      });

      if (!existingRating) {
        const randomReview =
          reviewTexts[Math.floor(Math.random() * reviewTexts.length)];

        await prisma.rating.create({
          data: {
            rating: Math.floor(Math.random() * 5) + 1,
            review: randomReview,
            userId,
            orderDetails: {
              connect: {
                productId: product.id,
              },
            },
            createdAt: new Date(randomDate),
          },
        });
      }
    }
  }
};


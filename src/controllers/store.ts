import { NextFunction, Request, Response } from "express";
import { RequestUser } from "../types";
import { prisma } from "../prisma";
import {
  extractFullUrlStore,
  returnJSONError,
  returnJSONSuccess,
} from "../utils/functions";
import { NotFound } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { validateCreateStore } from "../schema/store";
import { validatePagination } from "../schema/categories";
import { BadRequest } from "../exceptions/bad-request";
import fs from "fs";
import path from "path";
import logger from "../utils/logger";
import { CACHE_KEYS, clearCache } from "../middlewares/cache";
import { extendAmount } from "../prisma/extensions";
import { getProfit } from "../middlewares";
export const getAllStores = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as RequestUser;
    req.apicacheGroup = CACHE_KEYS.STORES;
    const { _limit, _page } = req.query;
    const validatedPag = validatePagination.safeParse({
      _page: +_page!,
    });
    const addFavourite = req.isAuthenticated()
      ? {
          favourite: {
            where: {
              id: user.id,
            },
            select: {
              id: true,
            },
          },
        }
      : {};
    const count = await prisma.store.count();
    const page = (+validatedPag.data?._page! - 1) * (_limit ? +_limit : count);
    const stores = await prisma.store.findMany({
      skip: page,
      take: +_limit! || undefined,
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        location: true,
        user: {
          select: {
            fullname: true,
          },
        },
        ...addFavourite,
      },
    });
    return returnJSONSuccess(res, {
      data: stores,
      totalPages: Math.ceil(count / (_limit ? +_limit : count)),
      hasMore: validatedPag.data?._page! * (_limit ? +_limit : count) < count,
    });
  } catch (error) {
    console.log(error);
    next(new NotFound("Store not found", ErrorCode.NOT_FOUND));
  }
};
const getStoreFullDetails = async (id: string, isStoreId = false) => {
  const query = isStoreId ? { id: id } : { userId: id };
  const store = await prisma.store.findFirstOrThrow({
    where: {
      ...query,
    },
    select: {
      name: true,
      id: true,
      description: true,
      image: true,
      bankDetails: true,
      shippingFee: true,
    },
  });
  const ratings = await prisma.rating.groupBy({
    where: {
      orderDetails: {
        AND: [
          { status: "DELIVERED" },
          { storeId: store.id },
          {
            order: {
              paymentStatus: true,
            },
          },
        ],
      },
    },
    by: ["rating"],
    _count: true,
  });

  let avg = await prisma.rating.aggregate({
    where: {
      orderDetails: {
        AND: [
          { status: "DELIVERED" },
          { storeId: store.id },
          {
            order: {
              paymentStatus: true,
            },
          },
        ],
      },
    },
    _avg: {
      rating: true,
    },
    _count: true,
    _sum: {
      rating: true,
    },
  });

  const totalItemSold = await prisma.order.count({
    where: {
      AND: [
        {
          orderDetails: {
            some: {
              AND: [{ status: "DELIVERED" }, { storeId: store.id }],
            },
          },
        },
        { paymentStatus: true },
      ],
    },
  });

  const feedback = (((avg._sum.rating || 0) / avg._count || 0) * 100) / 5;
  const findRating = (number: number) => {
    const rate = ratings.find((rating) => rating.rating === number);
    return {
      percentage: ((rate?._count || 0) / avg._count) * 100 || 0,
      total: rate?._count || 0,
      rating: number,
    };
  };
  const ratingWithPercent = [
    { ...findRating(5) },
    { ...findRating(4) },
    { ...findRating(3) },
    { ...findRating(2) },
    { ...findRating(1) },
  ];

  return {
    storeDetails: store,
    avgRating: avg._avg,
    ratingWithPercent,
    feedback: parseInt(feedback.toFixed(0)),
    totalItemSold,
  };
};
export const getPositiveReview = async (id: string) => {
  let positiveReview = await prisma.rating.aggregate({
    where: {
      AND: [
        {
          orderDetails: {
            AND: [{ status: "DELIVERED" }, { storeId: id }],
          },
        },
        {
          rating: {
            gte: 4,
          },
        },
      ],
    },
    _count: {
      rating: true,
    },
    _sum: {
      rating: true,
    },
  });

  const positiveFeedback =
    (((positiveReview._sum.rating || 0) / (positiveReview._count.rating || 0)) *
      100) /
    5;
  return positiveFeedback ? positiveFeedback : 0;
};
export const getStoreByUserLogged = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as RequestUser;
  req.apicacheGroup = CACHE_KEYS.STORE + user.id;
  try {
    return returnJSONSuccess(res, { data: await getStoreFullDetails(user.id) });
  } catch (error) {
    next(new NotFound("Store not found", ErrorCode.NOT_FOUND));
  }
};
export const getStoreById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    req.apicacheGroup = CACHE_KEYS.STORE_ID + id;

    if (id) {
      return returnJSONSuccess(res, {
        data: await getStoreFullDetails(id, true),
      });
    } else {
      next(new BadRequest("Invalid Request Parameters", ErrorCode.NOT_FOUND));
    }
  } catch (error) {
    next(new NotFound("Store not found", ErrorCode.NOT_FOUND));
  }
};
export const getProductsOfStoreById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  req.apicacheGroup = CACHE_KEYS.STORE_CATEGORIES_ID + id;
  if (id && id !== "") {
    const categories = await getCategory(id);
    return returnJSONSuccess(res, { data: categories });
  } else {
    next(new BadRequest("Invalid request parameters", ErrorCode.BAD_REQUEST));
  }
};
export const createStore = async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  validateCreateStore.parse(req.body);
  const checkIfStore = await await prisma.store.findFirst({
    where: {
      userId: user.id,
    },
  });
  if (!checkIfStore) {
    const store = await prisma.store.create({
      data: {
        ...req.body,
        userId: user.id,
      },
    });

    return res.status(200).json({ status: true, data: store });
  }
  return res.status(200).json({ status: true, data: checkIfStore });
};
export const getStoreProducts = async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  req.apicacheGroup = CACHE_KEYS.STORE_PRODUCTS + user.id;
  const categories = await prisma.store.findFirstOrThrow({
    where: {
      userId: user.id,
    },
    select: {
      products: {
        where: {
          AND: [{ publish: true }, { deleted: false }],
        },
        select: {
          id: true,
          name: true,
          itemCondition: true,
          salesType: true,
          amount: true,
          quantity: true,
          details: true,
          coverImage: true,
          images: true,
          publish: true,
          categories: true,
          endBiddingDate: true,
        },
      },
    },
  });

  return res.status(200).json({ status: true, data: categories.products });
};
export const getStoreDraftProducts = async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  req.apicacheGroup = CACHE_KEYS.STORE_DRAFT + user.id;
  const store = await prisma.store.findFirstOrThrow({
    where: { userId: user.id },
    select: { id: true },
  });
  const categories = await prisma.store.findFirstOrThrow({
    where: {
      id: store.id,
    },
    select: {
      products: {
        where: {
          AND: [{ deleted: false }, { publish: false }],
        },
        select: {
          id: true,
          name: true,
          itemCondition: true,
          salesType: true,
          amount: true,
          quantity: true,
          details: true,
          coverImage: true,
          images: true,
          publish: true,
        },
      },
    },
  });

  return res.status(200).json({ status: true, data: categories.products });
};
export const updateStoreProfile = async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  const { name, description } = req.body;
  const image = req.file as Express.Multer.File;
  const storeImage = await prisma.store.findFirstOrThrow({
    where: { userId: user.id },
    select: { image: true },
  });
  let tempName =
    !!name && name !== ""
      ? {
          name: name,
        }
      : {};
  let tempDescription =
    !!description && description !== ""
      ? {
          description: description,
        }
      : {};
  let tempImage = extractFullUrlStore(req) + image.filename;
  const data = {
    ...tempName,
    ...tempDescription,
    image: tempImage,
  };

  const store = await prisma.store.update({
    where: {
      userId: user.id,
    },
    data,
    select: {
      name: true,
      description: true,
      image: true,
      id: true,
    },
  });
  clearCache(CACHE_KEYS.STORE + user.id);
  clearCache(CACHE_KEYS.STORE_ID + store.id);
  clearCache(CACHE_KEYS.STORES);
  if (storeImage.image && storeImage.image !== "") {
    fs.unlink(
      path.resolve(
        __dirname,
        `../${storeImage.image.substring(storeImage.image.indexOf("/images"))}`
      ),
      (error) => {
        if (error) {
          logger.error("Unable to delete image");
        }
      }
    );
  }
  returnJSONSuccess(res, { data: store });
};
export const addStoreToFavourite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;

  const user = req.user as RequestUser;
  if (id) {
    try {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          favouriteStores: {
            connect: [{ id }],
          },
        },
      });
      clearCache(CACHE_KEYS.STORES);
      clearCache(CACHE_KEYS.FAVORITE_STORE + user.id);
      clearCache(CACHE_KEYS.STORE + user.id);
      clearCache(CACHE_KEYS.STORE_ID + id);

      return returnJSONSuccess(res);
    } catch (error) {
      return returnJSONError(res, { message: "Unable to add to favourite" });
    }
  } else {
    next(new BadRequest("Invalid Request Parameter", ErrorCode.BAD_REQUEST));
  }
};
export const removeStoreFromFavourite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const user = req.user as RequestUser;
  if (id) {
    try {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          favouriteStores: {
            disconnect: [{ id }],
          },
        },
      });
      clearCache(CACHE_KEYS.STORES);
      clearCache(CACHE_KEYS.FAVORITE_STORE + user.id);
      clearCache(CACHE_KEYS.STORE + user.id);
      clearCache(CACHE_KEYS.STORE_ID + id);

      return returnJSONSuccess(res);
    } catch (error) {
      return returnJSONError(res, { message: "Unable to add to favourite" });
    }
  } else {
    next(new BadRequest("Invalid Request Parameter", ErrorCode.BAD_REQUEST));
  }
};
export const getFavouriteStores = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as RequestUser;
  req.apicacheGroup = CACHE_KEYS.FAVORITE_STORE + user.id;
  try {
    const favourite = await prisma.user.findFirstOrThrow({
      where: {
        id: user.id,
      },
      select: {
        favouriteStores: true,
      },
    });
    const superFavStore = await Promise.all(
      favourite.favouriteStores.map((fav) => getStoreFullDetails(fav.userId))
    );
    const favouriteStores = superFavStore.every(
      (store) => Object.keys(store).length > 1
    )
      ? superFavStore
      : [];
    returnJSONSuccess(res, { data: favouriteStores });
  } catch (error) {
    next(new NotFound("User not found", ErrorCode.NOT_FOUND));
  }
};
export const getStoreCategories = async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  req.apicacheGroup = CACHE_KEYS.STORE_CATEGORIES + user.id;
  const store = await prisma.store.findFirstOrThrow({
    where: { userId: user.id },
    select: { id: true },
  });
  const categories = await getCategory(store.id, false);
  return returnJSONSuccess(res, { data: categories });
};
export const getCategoriesfromStoreById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  req.apicacheGroup = CACHE_KEYS.STORE_CATEGORIES_ID + id;
  if (id && id !== "") {
    const categories = await getCategory(id);
    return returnJSONSuccess(res, { data: categories });
  } else {
    next(new BadRequest("Invalid request parameters", ErrorCode.BAD_REQUEST));
  }
};
const getCategory = async (id: string, store = true) => {
  const profit = await getProfit();
  const categories = await prisma
    .$extends(extendAmount(profit))
    .category.findMany({
      where: {
        products: {
          some: {
            AND: [
              { storeId: id },
              {
                id: {
                  not: undefined,
                },
              },
              { deleted: false },
              { publish: true },
              {
                quantity: {
                  gt: 0,
                },
              },
            ],
          },
        },
      },

      select: {
        name: true,
        id: true,
        createdAt: true,
        products: {
          where: {
            AND: [
              { storeId: id },
              {
                id: {
                  not: undefined,
                },
              },
              { deleted: false },
              { publish: true },
              {
                quantity: {
                  gt: 0,
                },
              },
            ],
          },
          select: {
            id: true,
            name: true,
            itemCondition: true,
            salesType: true,
            endBiddingDate: true,
            amount: true,
            quantity: true,
            details: true,
            publish: true,
            coverImage: true,
            images: true,
            storeId: true,
            createdAt: true,
          },
        },
      },
    });
  return categories;
};
export const getReviewsForLoggedInUser = async (
  req: Request,
  res: Response
) => {
  const user = req.user as RequestUser;
  req.apicacheGroup = CACHE_KEYS.STORE_REVIEWS + user.id;
  const store = await prisma.store.findFirstOrThrow({
    where: { userId: user.id },
    select: { id: true },
  });
  const reviews = await getReviewsForStore(store.id);
  returnJSONSuccess(res, { data: reviews });
};
export const getReviewsForStoreById = async (req: Request, res: Response) => {
  const { id } = req.params;
  req.apicacheGroup = CACHE_KEYS.STORE_REVIEWS_ID + id;
  const reviews = await getReviewsForStore(id);
  return returnJSONSuccess(res, { data: reviews });
};
const getReviewsForStore = async (id: string) => {
  const reviews = await prisma.rating.findMany({
    where: {
      AND: [
        {
          orderDetails: {
            AND: [{ status: "DELIVERED" }, { storeId: id }],
          },
        },
      ],
    },
    select: {
      rating: true,
      review: true,
      id: true,
      user: {
        select: {
          fullname: true,
          id: true,
        },
      },
      orderDetails: {
        select: {
          product: {
            select: {
              name: true,
              id: true,
              coverImage: true,
            },
          },
        },
      },
    },
  });
  return reviews;
};
export const getStoreOrders = async (req: Request, res: Response) => {
  const { id } = req.user as RequestUser;
  req.apicacheGroup = CACHE_KEYS.STORE_ORDERS + id;
  const store = await prisma.store.findFirstOrThrow({
    where: {
      userId: id,
    },
  });
  const orders = await prisma.order.findMany({
    where: {
      AND: [
        {
          orderDetails: {
            some: {
              storeId: store.id,
            },
          },
        },
        { paymentStatus: true },
      ],
    },
    select: {
      id: true,
      orderId: true,
      amount: true,
      createdAt: true,
      orderDetails: {
        where: {
          storeId: store.id,
        },
        select: {
          id: true,
          status: true,
          storeId: true,
          shippingFee: true,
          amount: true,
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              coverImage: true,
            },
          },
        },
      },
      user: {
        select: {
          fullname: true,
          id: true,
          address: true,
        },
      },
    },
  });

  returnJSONSuccess(res, { data: orders });
};
export const updateDeliveryStatusOfOrder = async (
  req: Request,
  res: Response
) => {
  const { status } = req.body;
  const user = req.user as RequestUser;
  const { id } = req.params;
  const store = await prisma.store.findFirstOrThrow({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
    },
  });
  const stat =
    status === 3 ? "DELIVERED" : status === 2 ? "DISPATCHED" : "PENDING";
  const order = await prisma.orderDetails.updateMany({
    where: {
      AND: [{ orderId: id }, { storeId: store.id }],
    },
    data: {
      status: stat,
    },
  });
  const o = await prisma.order.findFirst({
    where: {
      id,
    },
    select: { userId: true },
  });
  clearCache(CACHE_KEYS.USER_ORDERS + o?.userId);
  clearCache(CACHE_KEYS.USER_DELIVERED_ORDERS + o?.userId);
  clearCache(CACHE_KEYS.STORE_ORDERS + user.id);
  clearCache(CACHE_KEYS.STORE_TRANSACTIONS + user.id);
  clearCache(CACHE_KEYS.STORE_PRODUCTS + user.id);
  clearCache(CACHE_KEYS.STORE + user.id);
  clearCache(CACHE_KEYS.STORE_ABOUT + user.id);
  clearCache(CACHE_KEYS.STORE_ID + store.id);

  returnJSONSuccess(res, { data: order });
};
export const addBankDetails = async (req: Request, res: Response) => {
  const { id } = req.user as RequestUser;
  const { bank, accountNumber } = req.body;
  const store = await prisma.store.findFirstOrThrow({
    where: {
      userId: id,
    },
    select: {
      id: true,
    },
  });
  const bankDetails = await prisma.bankDetails.upsert({
    where: {
      storeId: store.id,
    },
    update: {
      bank,
      accountNumber,
    },
    create: {
      storeId: store.id,
      bank,
      accountNumber,
    },
  });
  clearCache(CACHE_KEYS.STORE + id);
  clearCache(CACHE_KEYS.STORE_BANK + id);
  returnJSONSuccess(res, { data: store });
};
export const getAboutStore = async (req: Request, res: Response) => {
  const { id } = req.user as RequestUser;
  req.apicacheGroup = CACHE_KEYS.STORE_ABOUT + id;
  const store = await prisma.store.findFirstOrThrow({
    where: { userId: id },
    select: { id: true },
  });
  const messagesLength = await prisma.sellerMessage.count({
    where: {
      storeId: store.id,
    },
  });
  const products = await prisma.product.findMany({
    where: {
      AND: [{ storeId: store.id }, { publish: true }, { deleted: false }],
    },
    select: {
      quantity: true,
      amount: true,
    },
  });
  const stock = products
    .map(({ amount, quantity }) => amount * quantity)
    .reduce((x, y) => x + y, 0);

  const fufilledOrders = await prisma.order.count({
    where: {
      AND: [
        {
          orderDetails: {
            some: {
              AND: [
                {
                  status: "DELIVERED",
                },
                {
                  storeId: store.id,
                },
              ],
            },
          },
        },
        { paymentStatus: true },
      ],
    },
  });

  const income: any =
    await prisma.$queryRaw`SELECT sum(amount) as amount FROM sellerspaymenthistory WHERE storeId = ${
      store.id
    } AND MONTH(createdAt) = MONTH(${new Date()})`;
  return returnJSONSuccess(res, {
    data: {
      income: income[0].amount || 0,
      stock: parseFloat(stock.toFixed(2)),
      fufilledOrders: fufilledOrders || 0,
      messages: messagesLength,
    },
  });
};
export const getIncomeAndTransactionsFromStore = async (
  req: Request,
  res: Response
) => {
  const { id } = req.user as RequestUser;
  const store = await prisma.store.findFirstOrThrow({
    where: { userId: id },
    select: { id: true },
  });
  req.apicacheGroup = CACHE_KEYS.STORE_TRANSACTIONS + id;
  const income =
    await prisma.$queryRaw`SELECT DATE(createdAt) AS createdAt, sum(amount) AS amount FROM sellerspaymenthistory WHERE storeId = ${store.id} GROUP BY MONTH(createdAt)`;

  const transactions = await prisma.order.findMany({
    where: {
      AND: [
        {
          orderDetails: {
            some: {
              status: "DELIVERED",
            },
          },
        },
        { paymentStatus: true },
      ],
    },
    select: {
      id: true,
      amount: true,
      createdAt: true,
      orderId: true,
      orderDetails: {
        where: {
          storeId: store.id,
        },
        select: {
          id: true,
          status: true,
          storeId: true,
          shippingFee: true,
          amount: true,
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              coverImage: true,
            },
          },
        },
      },
      sellerPaymentHistory: {
        where: {
          storeId: store.id,
        },
        select: {
          amount: true,
          createdAt: true,
        },
      },
      user: {
        select: {
          fullname: true,
          id: true,
          address: true,
        },
      },
    },
  });
  return returnJSONSuccess(res, {
    data: {
      income,
      transactions,
    },
  });
};
export const updateDeliveryFee = async (req: Request, res: Response) => {
  const { fee } = req.body;
  const user = req.user as RequestUser;
  await prisma.store.update({
    where: {
      userId: user.id,
    },
    data: {
      shippingFee: fee,
    },
  });
  clearCache(CACHE_KEYS.STORE_DELIVERY_FEE + user.id);
  return returnJSONSuccess(res);
};
export const getStoreShippingFee = async (req: Request, res: Response) => {
  const { id } = req.user as RequestUser;
  req.apicacheGroup = CACHE_KEYS.STORE_DELIVERY_FEE + id;
  const fee = await prisma.store.findFirstOrThrow({
    where: {
      user: {
        id,
      },
    },
    select: {
      shippingFee: true,
    },
  });
  return returnJSONSuccess(res, { data: fee });
};
export const getStoreBankDetails = async (req: Request, res: Response) => {
  const { id } = req.user as RequestUser;
  req.apicacheGroup = CACHE_KEYS.STORE_BANK + id;
  const fee = await prisma.store.findFirstOrThrow({
    where: {
      user: {
        id,
      },
    },
    select: {
      bankDetails: true,
    },
  });
  return returnJSONSuccess(res, { data: fee });
};
export const getStoreMessages = async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  req.apicacheGroup = CACHE_KEYS.STORE_MESSAGES + user.id;
  const messages = await prisma.sellerMessage.findMany({
    where: {
      store: {
        userId: user.id,
      },
    },
    select: {
      id: true,
      from: true,
      message: true,
      user: {
        select: {
          fullname: true,
          email: true,
          id: true,
        },
      },
      product: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  returnJSONSuccess(res, { data: messages });
};

import { NextFunction, Request, Response } from "express";
import { RequestUser } from "../types";
import { prisma } from "../prisma";
import { returnJSONSuccess } from "../utils/functions";
import { validatePagination } from "../schema/categories";
import { BadRequest } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { NotFound } from "../exceptions/not-found";
import { CACHE_KEYS, clearCache } from "../middlewares/cache";
import { extendOrderAmount } from "../prisma/extensions";
import { validateReview } from "../schema/users";

export const getOrders = async (req: Request, res: Response) => {
  const { _limit, _page } = req.query;
  const user = req.user! as RequestUser;
  const validatedPag = validatePagination.safeParse({
    _page: +_page!,
  });
  req.apicacheGroup = CACHE_KEYS.USER_ORDERS + user.id;
  const count = await prisma.order.count({ where: { userId: user.id } });
  const page = (+validatedPag.data?._page! - 1) * (_limit ? +_limit : count);
  const orders = await prisma.$extends(extendOrderAmount()).order.findMany({
    skip: page,
    take: +_limit! || undefined,
    where: {
      AND: [{ userId: user.id }, { paymentStatus: true }],
    },
    select: {
      id: true,
      orderId: true,
      amount: true,
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
              store: {
                select: {
                  name: true,
                  id: true,
                  image: true,
                },
              },
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
export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (id) {
    try {
      const order = await prisma.order.findFirstOrThrow({
        where: {
          AND: [{ id: id }, { paymentStatus: true }],
        },
        select: {
          id: true,
          orderId: true,
          amount: true,
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
                  store: {
                    select: {
                      name: true,
                      id: true,
                      image: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      returnJSONSuccess(res, { data: order });
    } catch (error) {
      next(new NotFound("Order not found", ErrorCode.NOT_FOUND));
    }
  } else {
    next(new BadRequest("Invalid request parameters", ErrorCode.BAD_REQUEST));
  }
};
export const getAllDeliveredOrders = async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  req.apicacheGroup = CACHE_KEYS.USER_DELIVERED_ORDERS + user.id;
  const orders = await prisma.order.findMany({
    where: {
      AND: [
        { userId: user.id },
        { paymentStatus: true },
        {
          orderDetails: {
            some: {
              status: "DELIVERED",
            },
          },
        },
      ],
    },
  });
  returnJSONSuccess(res, { data: orders });
};
export const rateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as RequestUser;
  const { id } = req.params;
  const validated = validateReview.parse(req.body);
  const checkifDelivered = await prisma.orderDetails.findFirstOrThrow({
    where: {
      id,
    },
    select: {
      status: true,
      productId: true,
      storeId: true,
    },
  });
  if (checkifDelivered.status !== "DELIVERED") {
    return next(
      new BadRequest("Order has not been delivered", ErrorCode.BAD_REQUEST)
    );
  }
  await prisma.rating.upsert({
    where: {
      orderDetailsId: id,
    },
    update: {
      ...validated,
    },
    create: {
      ...validated,
      userId: user.id,
      orderDetailsId: id,
    },
  });
  clearCache(CACHE_KEYS.PRODUCT + checkifDelivered.productId);
  clearCache(CACHE_KEYS.STORE + checkifDelivered.storeId);
  clearCache(CACHE_KEYS.STORE_ID + checkifDelivered.storeId);
  clearCache(CACHE_KEYS.STORE_ABOUT + checkifDelivered.storeId);
  clearCache(CACHE_KEYS.STORE_REVIEWS + checkifDelivered.storeId);
  clearCache(CACHE_KEYS.STORE_REVIEWS_ID + checkifDelivered.storeId);

  returnJSONSuccess(res);
};

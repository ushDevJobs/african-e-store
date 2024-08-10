import { NextFunction, Request, Response } from "express";
import { RequestUser } from "../types";
import { prisma } from "../prisma";
import { returnJSONSuccess } from "../utils/functions";
import { validatePagination } from "../schema/categories";
import { BadRequest } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { NotFound } from "../exceptions/not-found";
import { CACHE_KEYS } from "../middlewares/cache";
import { extendOrderAmount } from "../prisma/extensions";

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

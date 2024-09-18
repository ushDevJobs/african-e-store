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
  if (!user || user.accountType !== 'ADMIN') {
    return returnJSONError(res, { message: "Unauthorized" }, 403);
  }
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
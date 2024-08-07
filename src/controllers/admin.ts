import { NextFunction, Request, Response } from "express";
import { validateAcceptPayment } from "../schema/admin";
import { prisma } from "../prisma";
import { returnJSONError, returnJSONSuccess } from "../utils/functions";
import { NotFound } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const approvePaymentByAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { orderId } = req.body;
  try {
    const store = await prisma.store.findFirstOrThrow({
      where: {
        id,
      },
      select: {
        sellerDashboard: true,
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
        orderId: orderId,
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
      return returnJSONSuccess(res);
    } else {
      return returnJSONError(res, { message: "Order already paid out" });
    }
  } else {
    return returnJSONError(res, { message: "Order not delivered" });
  }
};

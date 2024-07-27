import { Request, Response } from "express";
import { validateAcceptPayment } from "../schema/admin";
import { prisma } from "../prisma";
import { returnJSONError, returnJSONSuccess } from "../utils/functions";

export const approvePaymentByAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { orderId } = req.body;
  validateAcceptPayment.parse({ id, orderId });
  const deliveryUpdate = await prisma.orderDeliveryStatus.findFirst({
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
      const order = await prisma.order.findFirst({
        where: {
          id: orderId,
        },
        select: {
          products: {
            where: {
              storeId: id,
            },
            select: {
              id: true,
              modifiedAmount: true,
              store: {
                select: {
                  shippingFee: true,
                },
              },
            },
          },
          quantity: true,
        },
      });
      const amount = 0;
      // (order?.products
      //   .map(
      //     (product) =>
      //       product.modifiedAmount *
      //       (order.quantity.find((q) => q.id === product.id)?.quantity || 0)
      //   )
      //   .reduce((x, y) => x + y, 0) || 0) +
      // (order?.products[0].store.shippingFee || 0);
      try {
        await prisma.sellerDashboard.upsert({
          where: {
            storeId: id,
            AND: [
              {
                payment: {
                  none: {
                    orderId,
                  },
                },
              },
            ],
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
      } catch (error) {
        console.log(error);
      }
    } else {
      return returnJSONError(res, { message: "Order already paid out" });
    }
  } else {
    return returnJSONError(res, { message: "Order not delivered" });
  }

  return returnJSONSuccess(res);
};

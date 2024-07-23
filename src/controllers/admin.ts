import { Request, Response } from "express";
import { validateAcceptPayment } from "../schema/admin";
import { prisma } from "../prisma";
import { SellerPaid } from "../types";
import { returnJSONSuccess } from "../utils/functions";

export const approvePaymentByAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { orderId } = req.body;
  validateAcceptPayment.parse({ id, orderId });
  const paymentStatus = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    select: {
      sellerPaid: true,
    },
  });
  const newStatus: SellerPaid =
    paymentStatus?.sellerPaid.filter((status) => status.storeId === id) || [];
  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      sellerPaid: [...newStatus, { status: true, storeId: id }],
    },
  });
  return returnJSONSuccess(res);
};

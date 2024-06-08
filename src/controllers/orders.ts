import { Request, Response } from "express";
import { RequestUser } from "../types";
import { prisma } from "../prisma";
import { returnJSONSuccess } from "../utils/functions";

export const getOrders = async (req: Request, res: Response) => {
  const user = req.user! as RequestUser;
  const orders = await prisma.user.findMany({
    where: {
      id: user.id,
    },
    select: {
      orders: {
        select: {
          id: true,
          quantity: true,
          amount: true,
          status: true,
          trackingId: true,
          products: {
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
    data: orders[0].orders,
    count: orders[0].orders.length,
  });
};
export const deleteItemFromCart = async (req: Request, res: Response) => {
  const { id } = req.query;
  await prisma.cart.delete({
    where: {
      id: id as string,
    },
  });
  returnJSONSuccess(res);
};

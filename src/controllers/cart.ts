import { Request, Response } from "express";
import { RequestUser } from "../types";
import { prisma } from "../prisma";
import { returnJSONSuccess } from "../utils/functions";

export const getCartItems = async (req: Request, res: Response) => {
  const user = req.user! as RequestUser;
  const cart = await prisma.user.findMany({
    where: {
      id: user.id,
    },
    select: {
      cartItems: {
        select: {
          id: true,
          quantity: true,
          products: {
            select: {
              name: true,
              id: true,
              details: true,
              coverImage: true,
              itemCondition: true,
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
    data: cart[0].cartItems,
    count: cart[0].cartItems.length,
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

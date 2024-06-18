import { NextFunction, Request, Response } from "express";
import { RequestUser } from "../types";
import { prisma } from "../prisma";
import { returnJSONError, returnJSONSuccess } from "../utils/functions";
import { BadRequest } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";

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
          product: {
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
export const addItemToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;
  const user = req.user as RequestUser;
  if (id) {
    try {
      await prisma.cart.upsert({
        where: {
          productId_userId: {
            productId: id,
            userId: user.id,
          },
        },
        update: {
          quantity: {
            increment: 1,
          },
        },
        create: {
          productId: id,
          userId: user.id,
        },
      });
      return returnJSONSuccess(res);
    } catch (error) {
      return returnJSONError(res, { message: "Unable to add to cart" });
    }
  } else {
    next(new BadRequest("Invalid Request Parameters", ErrorCode.BAD_REQUEST));
  }
};

import { Request, Response } from "express";
import { RequestUser } from "../types";
import { prisma } from "../prisma";
import { returnJSONSuccess } from "../utils/functions";

export const getCartDetails = async (req: Request, res: Response) => {
  const user = req.user! as RequestUser;
  const cart = await prisma.cart.findMany({
    where: {
      id: user.id,
    },
  });
  returnJSONSuccess(res, { data: cart });
};

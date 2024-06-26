import { Request, Response } from "express";
import { prisma } from "../prisma";
import { returnJSONSuccess } from "../utils/functions";

export const updateProduct = async () => {};
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await prisma.product.findFirst({
    where: {
      id,
    },
include:{
store:true,
}
  });
  return returnJSONSuccess(res, { data: product });
};

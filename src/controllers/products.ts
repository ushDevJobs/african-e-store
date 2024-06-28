import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma";
import { returnJSONSuccess } from "../utils/functions";
import { validatecreateProduct } from "../schema/products";

export const updateProduct = async () => {};

export const addProduct = async (req: Request, res: Response, next:NextFunction) => {

  validatecreateProduct.parse(req.body)
  
  return returnJSONSuccess(res)
}

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

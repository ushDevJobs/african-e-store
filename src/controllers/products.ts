import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma";
import { returnJSONSuccess } from "../utils/functions";
import { validatecreateProduct } from "../schema/products";
import { RequestUser } from "../types";
import { InternalException } from "../exceptions/internal-exception";
import { ErrorCode } from "../exceptions/root";

export const updateProduct = async () => {};

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as RequestUser;
  const imagesArray = req.files as any[];
  const images = imagesArray.map((image) => image.filename);
  const validatedProduct = validatecreateProduct.parse(req.body);
  const storeId = await prisma.store.findFirstOrThrow({
    where: { userId: user.id },
    select: { id: true },
  });

  try {
    await prisma.product.create({
      data: {
        coverImage: images.length > 0 ? images[0] : null,
        itemCondition: validatedProduct.condition,
        name: validatedProduct.name,
        amount: validatedProduct.price,
        endBiddingDate: validatedProduct.date,
        images: JSON.stringify(images),
        details: validatedProduct.description,
        returnPolicy: "",
        storeId: storeId.id,
      },
    });
    return returnJSONSuccess(res);
  } catch (error) {
    next(
      new InternalException(
        "Failed to create product",
        ErrorCode.FAILED_TO_ADD_PRODUCT,
        error
      )
    );
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await prisma.product.findFirst({
    where: {
      id,
    },
    include: {
      store: true,
    },
  });
  return returnJSONSuccess(res, { data: product });
};

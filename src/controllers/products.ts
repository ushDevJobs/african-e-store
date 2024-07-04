import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma";
import {
  createPrismaError,
  extractFullUrlProducts,
  returnJSONError,
  returnJSONSuccess,
} from "../utils/functions";
import { validatecreateProduct } from "../schema/products";
import { RequestUser } from "../types";
import { InternalException } from "../exceptions/internal-exception";
import { ErrorCode } from "../exceptions/root";
import { BadRequest } from "../exceptions/bad-request";
import { NotFound } from "../exceptions/not-found";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DatabaseException } from "../exceptions/datebase-exception";
import { getPositiveReview } from "./store";

export const updateProduct = async () => {};

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as RequestUser;
  const imagesArray = req.files as any[];
  const images = imagesArray.map(
    (image) => extractFullUrlProducts(req) + image.filename
  );
  if (images.length === 0) {
    next(new BadRequest("Upload one or more image(s)", ErrorCode.BAD_REQUEST));
  }
  const validatedProduct = validatecreateProduct.parse(req.body);
  const storeId = await prisma.store.findFirstOrThrow({
    where: { userId: user.id },
    select: { id: true },
  });

  try {
    console.log(req.body.date);
    await prisma.product.create({
      data: {
        coverImage: images.length > 0 ? images[0] : "",
        itemCondition: validatedProduct.condition,
        name: validatedProduct.name,
        amount: validatedProduct.price,
        endBiddingDate:
          req.body.data && req.body.date !== ""
            ? new Date(req.body.date) || null
            : null,
        images: JSON.stringify(images),
        details: validatedProduct.description,
        quantity: validatedProduct.quantity,
        publish: validatedProduct.publish === "false" ? false : true,
        storeId: storeId.id,
        categories: {
          connect: [{ id: req.body.category }],
        },
      },
    });
    return returnJSONSuccess(res);
  } catch (error: any) {
    const generatedError = createPrismaError(error);
    if (generatedError) {
      next(
        new DatabaseException(
          generatedError,
          400,
          ErrorCode.DUPLICATE_FIELD,
          error
        )
      );
    } else {
      next(
        new DatabaseException(
          "Failed to create product",
          ErrorCode.FAILED_TO_ADD_PRODUCT,
          500,
          error
        )
      );
    }
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  const { id } = req.params;
  let product = await prisma.product.findFirst({
    where: {
      AND: [{ id }, { publish: true }],
    },
    select: {
      id: true,
      name: true,
      itemCondition: true,
      salesType: true,
      amount: true,
      quantity: true,
      details: true,
      coverImage: true,
      store: true,
      discount: true,
      discountPercentage: true,
      images: true,
      favourite: {
        where: {
          id: user.id,
        },
        select: {
          id: true,
        },
      },
      endBiddingDate: true,
      returnPolicy: true,
      ratings: {
        where: {
          AND: [{ NOT: { orderId: null } }, { NOT: { productId: undefined } }],
        },
      },
    },
  });
  return returnJSONSuccess(res, {
    data: product,
    positiveFeeback: await getPositiveReview(product?.store.id!),
  });
};
export const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await prisma.product.delete({
    where: {
      id,
    },
  });
  return returnJSONSuccess(res);
};
export const getFavouriteProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as RequestUser;
  try {
    const favourite = await prisma.user.findFirstOrThrow({
      where: {
        id: user.id,
      },
      select: {
        favouriteProducts: {
          where: {
            publish: true,
          },
          include: {
            store: true,
          },
        },
      },
    });
    returnJSONSuccess(res, { data: favourite.favouriteProducts });
  } catch (error) {
    next(new NotFound("User not found", ErrorCode.NOT_FOUND));
  }
};
export const addProductToFavourite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;

  const user = req.user as RequestUser;
  if (id) {
    try {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          favouriteProducts: {
            connect: [{ id }],
          },
        },
      });
      return returnJSONSuccess(res);
    } catch (error) {
      return returnJSONError(res, { message: "Unable to add to favourite" });
    }
  } else {
    next(new BadRequest("Invalid Request Parameter", ErrorCode.BAD_REQUEST));
  }
};
export const removeProductFromFavourite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const user = req.user as RequestUser;
  if (id) {
    try {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          favouriteProducts: {
            disconnect: [{ id }],
          },
        },
      });
      return returnJSONSuccess(res);
    } catch (error) {
      return returnJSONError(res, { message: "Unable to add to favourite" });
    }
  } else {
    next(new BadRequest("Invalid Request Parameter", ErrorCode.BAD_REQUEST));
  }
};

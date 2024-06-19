import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";
import { returnJSONSuccess } from "../utils/functions";
import { validatePagination } from "../schema/categories";
import { BadRequest } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { NotFound } from "../exceptions/not-found";

export const getAllCategories = async (req: Request, res: Response) => {
  const { _limit, _page } = req.query;
  let products =
    req.query.products === undefined
      ? true
      : req.query.products === null
      ? true
      : req.query.products;
  const validatedPag = validatePagination.safeParse({
    _page: +_page!,
  });
  const count = await prisma.category.count();
  const page = (+validatedPag.data?._page! - 1) * (_limit ? +_limit : count);
  const fetchProduct = !!products
    ? {
        products: {
          where: {
            publish: true,
          },
        },
      }
    : {};

  const countProducts = !!products
    ? {
        _count: {
          select: {
            products: true,
          },
        },
      }
    : {};
  const categories = await prisma.category.findMany({
    skip: page,
    take: +_limit! || undefined,
    select: {
      id: true,
      name: true,
      createdAt: true,
      ...fetchProduct,
      ...countProducts,
    },
  });

  return returnJSONSuccess(res, {
    data: categories,
    totalPages: Math.ceil(count / (_limit ? +_limit : count)),
    hasMore: validatedPag.data?._page! * (_limit ? +_limit : count) < count,
  });
};
export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { _limit, _page } = req.query;
  const validatedPag = validatePagination.safeParse({
    _page: +_page!,
  });

  if (id) {
    const categoryWithProducts = await prisma.category.findFirst({
      where: {
        id,
      },
      skip: validatedPag.data?._page! - 1,
      take: +_limit! || undefined,
      select: {
        id: true,
        name: true,
        createdAt: true,
        products: true,
      },
    });
    if (!categoryWithProducts) {
      return next(new NotFound("Category not found", ErrorCode.NOT_FOUND));
    }
    return returnJSONSuccess(res, { data: categoryWithProducts });
  } else {
    next(new BadRequest("Invalid request parameters", ErrorCode.BAD_REQUEST));
  }
};
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name } = req.body;
  if (id && name && name !== "") {
    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name: name,
      },
    });
    if (!category) {
      return next(new NotFound("Category not found", ErrorCode.NOT_FOUND));
    }
    return returnJSONSuccess(res, { data: category });
  } else {
    next(new BadRequest("Invalid request parameters", ErrorCode.BAD_REQUEST));
  }
};

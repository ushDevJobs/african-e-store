import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";
import { returnJSONSuccess } from "../utils/functions";
import { validatePagination } from "../schema/categories";
import { BadRequest } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { NotFound } from "../exceptions/not-found";

export const getAllCategories = async (req: Request, res: Response) => {
  const { _limit, _page } = req.query;
  const validatedPag = validatePagination.safeParse({
    _limit: +_limit!,
    _page: +_page!,
  });
  const count = await prisma.category.count();
  const categories = await prisma.category.findMany({
    skip: validatedPag.data?._page,
    take: validatedPag.data?._limit,
    select: { id: true, name: true, createdAt: true },
  });

  return returnJSONSuccess(res, { data: categories, count });
};
export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (id) {
    const category = await prisma.category.findFirst({
      where: {
        id,
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

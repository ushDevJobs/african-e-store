import { Request, Response } from "express";
import { prisma } from "../prisma";
import { returnJSONSuccess } from "../utils/functions";
import { validatePagination } from "../schema/categories";

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

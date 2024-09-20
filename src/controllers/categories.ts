import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";
import { returnJSONSuccess } from "../utils/functions";
import { validatePagination } from "../schema/categories";
import { BadRequest } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { NotFound } from "../exceptions/not-found";
import { RequestUser } from "../types";
import { extendAmount } from "../prisma/extensions";
import { CACHE_KEYS, clearCache } from "../middlewares/cache";
import { getProfit } from "../middlewares";

export const getCategories = async (req: Request, res: Response) => {
  const { _limit, _page } = req.query;
  const user = req.user as RequestUser;
  req.apicacheGroup = CACHE_KEYS.CATEGORIES_WITH_PRODUCTS;
  const profit = await getProfit();
  const addFavourite = req.isAuthenticated()
    ? {
        favourite: {
          where: {
            id: user.id,
          },
          select: {
            id: true,
          },
        },
      }
    : {};
  let products =
    req.query.products === undefined
      ? true
      : req.query.products === null
      ? true
      : req.query.products;
  const validatedPag = validatePagination.safeParse({
    _page: +_page!,
  });
  const count = await prisma.category.count({
    where: {
      products: {
        some: {
          AND: [
            {
              id: {
                not: undefined,
              },
            },
            { deleted: false },
            { publish: true },
            {
              quantity: {
                gt: 0,
              },
            },
          ],
        },
      },
    },
  });
  const page = (+validatedPag.data?._page! - 1) * (_limit ? +_limit : count);
  const condition =
    req.query.condition === undefined
      ? null
      : req.query.condition === null
      ? null
      : req.query.condition === ""
      ? null
      : req.query.condition;
  let addCondition = {};
  if (condition) {
    if ((condition as string).toLocaleLowerCase() === "1") {
      addCondition = {
        itemCondition: "NEW",
      };
    } else if ((condition as string).toLocaleLowerCase() === "2") {
      addCondition = {
        itemCondition: "USED",
      };
    } else if ((condition as string).toLocaleLowerCase() === "3") {
      addCondition = {
        itemCondition: "REFURBISHED",
      };
    }
  }
  const fetchProduct =
    products === true || products === "true"
      ? {
          products: {
            where: {
              AND: [
                { publish: true },
                { deleted: false },
                {
                  quantity: {
                    gt: 0,
                  },
                },
                { ...addCondition },
              ],
            },
            select: {
              id: true,
              name: true,
              amount: true,
              itemCondition: true,
              salesType: true,
              quantity: true,
              details: true,
              coverImage: true,
              views: true,
              createdAt: true,
              ...addFavourite,
            },
          },
        }
      : {};
  const countProducts =
    products === true || products === "true"
      ? {
          _count: {
            select: {
              products: {
                where: {
                  AND: [
                    { publish: true },
                    { deleted: false },
                    {
                      quantity: {
                        gt: 0,
                      },
                    },
                  ],
                },
              },
            },
          },
        }
      : {};
  const categories = await prisma
    .$extends(extendAmount(profit))
    .category.findMany({
      skip: page,
      take: +_limit! || undefined,
      where: {
        products: {
          some: {
            AND: [
              {
                id: {
                  not: undefined,
                },
              },
              { publish: true },
              { deleted: false },
              {
                quantity: {
                  gt: 0,
                },
              },
            ],
          },
        },
      },
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
export const getAllCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  req.apicacheGroup = CACHE_KEYS.CATEGORIES;
  return returnJSONSuccess(res, {
    data: categories,
  });
};
export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  req.apicacheGroup = CACHE_KEYS.CATEGORY + id;
  const { _limit, _page } = req.query;
  const user = req.user as RequestUser;
  const profit = await getProfit();
  const addFavourite = req.isAuthenticated()
    ? {
        favourite: {
          where: {
            id: user.id,
          },
          select: {
            id: true,
          },
        },
      }
    : {};
  const validatedPag = validatePagination.safeParse({
    _page: +_page!,
  });

  if (id) {
    const categoryWithProducts = await prisma
      .$extends(extendAmount(profit))
      .category.findFirst({
        where: {
          id,
        },
        skip: validatedPag.data?._page! - 1,
        take: +_limit! || undefined,
        select: {
          id: true,
          name: true,
          createdAt: true,
          products: {
            where: {
              AND: [
                { publish: true },
                { deleted: false },
                {
                  quantity: {
                    gt: 0,
                  },
                },
              ],
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
              ...addFavourite,
            },
          },
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
    clearCache(CACHE_KEYS.CATEGORY + id);
    clearCache(CACHE_KEYS.CATEGORIES_WITH_PRODUCTS);
    clearCache(CACHE_KEYS.CATEGORIES);
    if (!category) {
      return next(new NotFound("Category not found", ErrorCode.NOT_FOUND));
    }
    return returnJSONSuccess(res, { data: category });
  } else {
    next(new BadRequest("Invalid request parameters", ErrorCode.BAD_REQUEST));
  }
};

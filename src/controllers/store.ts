import { NextFunction, Request, Response } from "express";
import { RequestUser } from "../types";
import { prisma } from "../prisma";
import { returnJSONError, returnJSONSuccess } from "../utils/functions";
import { NotFound } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { validateCreateStore } from "../schema/store";
import { validatePagination } from "../schema/categories";
import { BadRequest } from "../exceptions/bad-request";

export const getAllStores = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _limit, _page } = req.query;
    const validatedPag = validatePagination.safeParse({
      _page: +_page!,
    });
    const count = await prisma.store.count();
    const page = (+validatedPag.data?._page! - 1) * (_limit ? +_limit : count);
    const stores = await prisma.store.findMany({
      skip: page,
      take: +_limit! || undefined,
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        location: true,
        user: {
          select: {
            fullname: true,
          },
        },
      },
    });
    return returnJSONSuccess(res, {
      data: stores,
      totalPages: Math.ceil(count / (_limit ? +_limit : count)),
      hasMore: validatedPag.data?._page! * (_limit ? +_limit : count) < count,
    });
  } catch (error) {
    next(new NotFound("Store not found", ErrorCode.NOT_FOUND));
  }
};
export const searchForStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { q } = req.query;
  if (q && q !== "") {
    const stores = await prisma.store.findMany({
      where: {
        name: {
          contains: q as string,
        },
      },
    });

    return returnJSONSuccess(res, { data: stores });
  } else {
    next(new BadRequest("Invalid request parameters", ErrorCode.BAD_REQUEST));
  }
};
const getStoreFullDetails = async (id: string, isStoreId = false) => {
  const query = isStoreId ? { id: id } : { userId: id };
  const store = await prisma.store.findFirstOrThrow({
    where: {
      ...query,
    },
    select: {
      name: true,
      id: true,
      description: true,
      image: true,
    },
  });
  const ratings = await prisma.rating.groupBy({
    where: {
      storeId: store.id,
    },
    by: ["rating"],
    _count: true,
  });
  let avg = await prisma.rating.aggregate({
    _avg: {
      rating: true,
    },
    _count: true,
  });
  const totalItemSold = await prisma.order.count({
    where: {
      status: "DELIVERED",
      storeId: store.id,
    },
  });
  const totalRatingByUsers = await prisma.rating.groupBy({
    where: {
      storeId: store.id,
    },
    by: ["userId", "orderId"],
  });
  const feedback =
    ((totalRatingByUsers.length || 0) / totalItemSold || 0) * 100;
  const ratingWithPercent = ratings.map((rating) => ({
    rating: rating.rating,
    percentage: (rating._count / avg._count) * 100,
  }));
  return {
    storeDetails: store,
    avgRating: avg._avg,
    ratingWithPercent,
    feedback: parseInt(feedback.toFixed(0)),
    totalItemSold,
  };
};
export const getStoreByUserLogged = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as RequestUser;
  try {
    return returnJSONSuccess(res, { data: await getStoreFullDetails(user.id) });
  } catch (error) {
    next(new NotFound("Store not found", ErrorCode.NOT_FOUND));
  }
};
export const getStoreById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (id) {
      return returnJSONSuccess(res, {
        data: await getStoreFullDetails(id, true),
      });
    } else {
      next(new BadRequest("Invalid Request Parameters", ErrorCode.NOT_FOUND));
    }
  } catch (error) {
    next(new NotFound("Store not found", ErrorCode.NOT_FOUND));
  }
};
export const getCategoriesOfStoreById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (id) {
      const categories = await prisma.store.findFirstOrThrow({
        where: {
          id,
        },
        select: {
          categories: {
            select: {
              id: true,
              name: true,
              products: {
                where: {
                  publish: true,
                },
              },
            },
          },
        },
      });
      return returnJSONSuccess(res, { data: categories });
    } else {
      next(new BadRequest("Invalid Request Parameters", ErrorCode.NOT_FOUND));
    }
  } catch (error) {
    next(new NotFound("Store not found", ErrorCode.NOT_FOUND));
  }
};
export const getProductByIdOfStoreById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.params);
    const { storeId, productId } = req.params;
    if (storeId && productId && storeId !== "" && productId !== "") {
      const categories = await prisma.store.findFirstOrThrow({
        where: {
          id: storeId,
        },
        select: {
          products: {
            where: {
              id: productId,
            },
          },
        },
      });
      return returnJSONSuccess(res, { data: categories });
    } else {
      next(new BadRequest("Invalid Request Parameters", ErrorCode.NOT_FOUND));
    }
  } catch (error) {
    next(new NotFound("Store not found", ErrorCode.NOT_FOUND));
  }
};
export const createStore = async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  validateCreateStore.parse(req.body);
  const checkIfStore = await await prisma.store.findFirst({
    where: {
      userId: user.id,
    },
  });
  if (!checkIfStore) {
    const store = await prisma.store.create({
      data: {
        ...req.body,
        userId: user.id,
      },
    });

    return res.status(200).json({ status: true, data: store });
  }
  return res.status(200).json({ status: true, data: checkIfStore });
};
export const getStoreCategories = async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  const categories = await prisma.store.findFirst({
    where: {
      userId: user.id,
    },
    select: {
      categories: {
        select: {
          id: true,
          name: true,
          createdAt: true,
          products: true,
        },
      },
    },
  });
  return res.status(200).json({ status: true, data: categories });
};

export const searchStoreProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as RequestUser;
  const { q } = req.query;
  if (q && q !== "") {
    const store = await prisma.store.findFirstOrThrow({
      where: {
        userId: user.id,
      },
    });
    const products = await prisma.product.findMany({
      where: {
        AND: [
          { storeId: store.id },
          {
            name: {
              contains: q as string,
            },
          },
        ],
      },
    });

    return res.status(200).json({ status: true, data: products });
  } else {
    next(new BadRequest("Invalid request parameters", ErrorCode.BAD_REQUEST));
  }
};
export const getStoreProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as RequestUser;
  const { id } = req.params;
  if (id && id !== "") {
    const product = await prisma.store.findFirstOrThrow({
      where: {
        userId: user.id,
      },
      select: {
        products: {
          where: {
            id: id,
          },
        },
      },
    });

    return res.status(200).json({ status: true, data: product });
  } else {
    next(new BadRequest("Invalid request parameters", ErrorCode.BAD_REQUEST));
  }
};
export const updateStoreDescription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as RequestUser;
  const { description } = req.body;
  if (description && description !== "") {
    const updateDescription = await prisma.store.update({
      where: {
        userId: user.id,
      },
      data: {
        description,
      },
      select: {
        description: true,
      },
    });
    return returnJSONSuccess(res, { data: updateDescription });
  } else {
    next(new BadRequest("Invalid Request Parameters", ErrorCode.BAD_REQUEST));
  }
};
export const addStoreToFavourite = async (
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
          favouriteStores: {
            connect: [{ id }],
          },
        },
      });
    } catch (error) {
      return returnJSONError(res, { message: "Unable to add to favourite" });
    }
  } else {
    next(new BadRequest("Invalid Request Parameter", ErrorCode.BAD_REQUEST));
  }
};

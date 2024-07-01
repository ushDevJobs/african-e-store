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
    const user = req.user as RequestUser;
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
        favourite: {
          where: {
            id: user.id,
          },
          select: {
            id: true,
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
  // const ratingWithPercent = ratings.map((rating) => ({
  //   rating: rating.rating,
  //   percentage: (rating._count / avg._count) * 100,
  // }));
  const findRating = (number: number) => {
    const rate = ratings.find((rating) => rating.rating === number);
    return {
      percentage: ((rate?._count || 0) / avg._count) * 100 || 0,
      total: rate?._count || 0,
      rating: number,
    };
  };
  const ratingWithPercent = [
    { ...findRating(1) },
    { ...findRating(2) },
    { ...findRating(3) },
    { ...findRating(4) },
    { ...findRating(5) },
  ];

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
export const getProductsOfStoreById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { storeId } = req.params;
    const user = req.user as RequestUser;
    if (storeId && storeId !== "") {
      const categories = await prisma.store.findFirst({
        where: {
          id: storeId,
        },
        select: {
          products: {
            select: {
              id: true,
              name: true,
              itemCondition: true,
              salesType: true,
              amount: true,
              quantity: true,
              details: true,
              coverImage: true,
              favourite: {
                where: {
                  id: user.id,
                },
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });
      return returnJSONSuccess(res, { data: categories?.products });
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
export const getStoreProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as RequestUser;
  const store = await prisma.store.findFirstOrThrow({where: {userId:user.id}, select: {id:true}})
  const categories = await prisma.store.findFirstOrThrow({
    where: {
      id:store.id,
    },
    select: {
      products: {
        select: {
          categories: {
            select: {
              id:true,
              name:true,
              products: {
                where: {
                  storeId:store.id
                }
              }
            }
          },
        },
      },
    },
  });
  // const product = await prisma.store.findFirstOrThrow({
  //   where: {
  //     userId: user.id,
  //   },
  //   select: {
  //     products: true,
  //   },
  // });

  return res.status(200).json({ status: true, data: categories.products
    .flat()
    .map((categ) => categ.categories)
    .flat() });
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
export const updateStoreProfile = async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  const { name, description } = req.body;
  const image = req.file;
  let tempName =
    !!name && name !== ""
      ? {
          name: name,
        }
      : {};
  let tempDescription =
    !!description && description !== ""
      ? {
          description: description,
        }
      : {};
  let tempImage =
    !!image?.filename && image?.filename !== ""
      ? {
          image: image?.filename,
        }
      : {};
  const data = {
    ...tempName,
    ...tempDescription,
    ...tempImage,
  };
  const store = await prisma.store.update({
    where: {
      userId: user.id,
    },
    data,
    select: {
      name: true,
      description: true,
      image: true,
    },
  });
  returnJSONSuccess(res);
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
      return returnJSONSuccess(res);
    } catch (error) {
      return returnJSONError(res, { message: "Unable to add to favourite" });
    }
  } else {
    next(new BadRequest("Invalid Request Parameter", ErrorCode.BAD_REQUEST));
  }
};
export const getFavouriteStores = async (
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
        favouriteStores: true,
      },
    });
    returnJSONSuccess(res, { data: favourite.favouriteStores });
  } catch (error) {
    next(new NotFound("User not found", ErrorCode.NOT_FOUND));
  }
};
export const getStoreCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as RequestUser;
  const categories = await getCategory(user.id, false);
  return returnJSONSuccess(res, { data: categories });
};
export const getCategoriesfromStoreById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (id && id !== "") {
    const categories = await getCategory(id);
    return returnJSONSuccess(res, { data: categories });
  } else {
    next(new BadRequest("Invalid request parameters", ErrorCode.BAD_REQUEST));
  }
};
const getCategory = async (id: string, store = true) => {
  const condition = store ? { id: id } : { userId: id };
  const categories = await prisma.store.findFirstOrThrow({
    where: condition,
    select: {
      products: {
        select: {
          categories: true,
        },
      },
    },
  });
  return categories.products
    .flat()
    .map((categ) => categ.categories)
    .flat();
};

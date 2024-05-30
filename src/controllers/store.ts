import { NextFunction, Request, Response } from "express";
import { RequestUser } from "../types";
import { prisma } from "../prisma";
import { returnJSONSuccess } from "../utils/functions";
import { NotFound } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { validateCreateStore } from "../schema/store";
import { validatePagination } from "../schema/categories";

export const getAllStores = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _limit, _page } = req.query;
    const validatedPag = validatePagination.safeParse({
      _limit: +_limit!,
      _page: +_page!,
    });
    const count = await prisma.store.count();
    const stores = await prisma.store.findMany({
      skip: validatedPag.data?._page,
      take: validatedPag.data?._limit,
      select: {
        id: true,
        name: true,
        description: true,
        user: {
          select: {
            fullname: true,
          },
        },
      },
    });
    return returnJSONSuccess(res, { data: stores, count });
  } catch (error) {
    next(new NotFound("Store not found", ErrorCode.STORE_NOT_FOUND));
  }
};
export const searchForStore = async (req: Request, res: Response) => {
  const { name } = req.params;

  const stores = await prisma.store.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });

  return returnJSONSuccess(res, { data: stores });
};
export const getStoreByUserLogged = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as RequestUser;
  try {
    const store = await prisma.store.findFirstOrThrow({
      where: {
        userId: user.id,
      },
    });
    return returnJSONSuccess(res, { data: store });
  } catch (error) {
    next(new NotFound("Store not found", ErrorCode.STORE_NOT_FOUND));
  }
};
export const getStoreById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const store = await prisma.store.findFirstOrThrow({
      where: {
        id: id,
      },
    });
    return returnJSONSuccess(res, { data: store });
  } catch (error) {
    next(new NotFound("Store not found", ErrorCode.STORE_NOT_FOUND));
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
export const getStoreProduct = async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  const store = await prisma.store.findFirst({
    where: {
      userId: user.id,
    },
    select: {
      products: true,
    },
  });
  return res.status(200).json({ status: true, data: store });
};

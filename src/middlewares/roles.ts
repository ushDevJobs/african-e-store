import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import { prisma } from "../prisma";
import { validateProductMutation } from "../schema/products";
import { BadRequest } from "../exceptions/bad-request";
import { RequestUser } from "../types";
import { NotFound } from "../exceptions/not-found";

export async function mutateProductCheck(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const user = req.user as RequestUser;
  if (user.accountType === "SELLER") {
    const validated = validateProductMutation.safeParse({ id });
    if (validated.success) {
      try {
        await prisma.store.findFirstOrThrow({
          where: {
            userId: user.id,
            products: {
              some: {
                id: id,
              },
            },
          },
        });
        next();
      } catch (error) {
        next(
          new UnauthorizedException(
            "Cant access this product",
            ErrorCode.UNAUTHORIZED
          )
        );
      }
    } else {
      next(new BadRequest("Invalid request parameters", ErrorCode.BAD_REQUEST));
    }
  } else {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }
}
export function adminRoleCheck(req: Request, _: Response, next: NextFunction) {
  const user = req.user as RequestUser;
  if (user.accountType === "ADMIN") next();
  else {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }
}
export function sellerRoleCheck(req: Request, _: Response, next: NextFunction) {
  const user = req.user as RequestUser;
  if (user.accountType === "SELLER") next();
  else {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }
}
export async function checkStore(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const user = req.user as RequestUser;
  const checkIfStore = await prisma.store.findFirst({
    where: {
      userId: user.id,
    },
    select: { id: true },
  });
  if (checkIfStore) next();
  else {
    next(new NotFound("Store not found", ErrorCode.NOT_FOUND));
  }
}
export async function checkUserAccessibility(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const { id } = req.query;
  if (id) {
    const user = req.user as RequestUser;
    const checkCart = await prisma.cart.findFirst({
      where: {
        AND: [
          {
            id: id as string,
            userId: user.id,
          },
        ],
      },
      select: { id: true },
    });
    if (checkCart) next();
    else {
      next(new NotFound("Cart Item not found", ErrorCode.NOT_FOUND));
    }
  } else {
    next(new BadRequest("Invalid Request Parameters", ErrorCode.BAD_REQUEST));
  }
}
export async function checkStoreId(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const { id } = req.params;
  if (id) {
    try {
      await prisma.store.findFirstOrThrow({ where: { id: id } });
      next();
    } catch (error) {
      next(new NotFound("Store not found", ErrorCode.NOT_FOUND));
    }
  } else {
    next(new BadRequest("Invalid Request parameter", ErrorCode.BAD_REQUEST));
  }
}

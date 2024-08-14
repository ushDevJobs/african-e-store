import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";
import { InternalException } from "../exceptions/internal-exception";
import { DatabaseException } from "../exceptions/datebase-exception";
import { ErrorCode } from "../exceptions/root";

export const getProfit = async () => {
  try {
    const settings = await prisma.settings.findFirstOrThrow({
      select: {
        profitPercent: true,
      },
    });

    return settings.profitPercent;
  } catch (error) {
    throw new DatabaseException(
      "Couldnt find profit ",
      400,
      ErrorCode.BAD_REQUEST,
      error
    );
  }
};

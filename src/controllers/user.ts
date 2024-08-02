import { Request, Response } from "express";
import { prisma } from "../prisma";
import { RequestUser } from "../types";
import { returnJSONSuccess } from "../utils/functions";

export const getLoggedusersAddress = async (req: Request, res: Response) => {
  const address = await prisma.address.findFirst({
    where: {
      userId: (req.user as RequestUser).id,
    },
  });

  return returnJSONSuccess(res, { data: address });
};

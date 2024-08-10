import { Request, Response } from "express";
import { prisma } from "../prisma";
import { RequestUser } from "../types";
import { returnJSONSuccess } from "../utils/functions";
import { CACHE_KEYS } from "../middlewares/cache";

export const getLoggedusersAddress = async (req: Request, res: Response) => {
  req.apicacheGroup = CACHE_KEYS.USER_ADDRESS;
  const address = await prisma.address.findFirst({
    where: {
      userId: (req.user as RequestUser).id,
    },
  });

  return returnJSONSuccess(res, { data: address });
};

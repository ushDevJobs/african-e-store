import { Request, Response } from "express";
import { prisma } from "../prisma";
import { RequestUser } from "../types";
import { returnJSONSuccess } from "../utils/functions";
import { CACHE_KEYS, clearCache } from "../middlewares/cache";
import { Address, validateAddress } from "../schema/users";

export const getLoggedusersAddress = async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  req.apicacheGroup = CACHE_KEYS.USER_ADDRESS + user.id;
  const address = await prisma.address.findFirst({
    where: {
      userId: user.id,
    },
  });

  return returnJSONSuccess(res, { data: address });
};
export const updateuserAddress = async (req: Request, res: Response) => {
  console.log("not cache");
  const user = req.user as RequestUser;
  let validated = validateAddress.parse(req.body);
  let data: Address = { city: "" };
  validated.city && (data.city = validated.city);
  validated.street && (data.street = validated.street);
  validated.houseNumber && (data.houseNumber = validated.houseNumber);
  validated.postCode && (data.postCode = validated.postCode);
  validated.country && (data.country = validated.country);
  await prisma.address.upsert({
    where: {
      userId: user.id,
    },
    update: data,
    create: {
      ...data,
      userId: user.id,
    },
  });
  clearCache(CACHE_KEYS.USER_ADDRESS + user.id);
  returnJSONSuccess(res);
};

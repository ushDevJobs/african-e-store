import { PrismaClient } from "@prisma/client";
import { validateRegData } from "../schema/users";
export const prisma = new PrismaClient();

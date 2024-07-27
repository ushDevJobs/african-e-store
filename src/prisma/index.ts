import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient().$extends({
  result: {
    product: {
      modifiedAmount: {
        needs: { amount: true },
        compute(product) {
          return parseFloat(
            (product.amount + (product.amount * 10) / 100).toFixed(2)
          );
        },
      },
    },
  },
});

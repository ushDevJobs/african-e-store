import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient().$extends({
  result: {
    product: {
      modifiedAmount: {
        needs: { amount: true },
        async compute(product) {
          const settings = await prisma.settings.findFirst({
            select: {
              profitPercent: true,
            },
          });
          return parseFloat(
            (
              product.amount +
              (product.amount * (settings?.profitPercent || 0)) / 100
            ).toFixed(2)
          );
        },
      },
    },
  },
});

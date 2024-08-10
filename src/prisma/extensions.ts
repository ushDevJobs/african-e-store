import { Prisma } from "@prisma/client";
export const extendAmount = (settings: { profitPercent: number }) => {
  return Prisma.defineExtension({
    result: {
      product: {
        amount: {
          needs: { amount: true },
          compute(product) {
            const profit = settings.profitPercent;
            return parseFloat(
              (product.amount + (product.amount * profit) / 100).toFixed(2)
            );
          },
        },
      },
    },
  });
};
export const extendOrderAmount = () => {
  return Prisma.defineExtension({
    result: {
      orderDetails: {
        amount: {
          needs: { amount: true, interest: true },
          compute(details) {
            const percent = (details.amount * details.interest) / 100;
            return parseFloat((details.amount + percent).toFixed(2));
          },
        },
      },
    },
  });
};

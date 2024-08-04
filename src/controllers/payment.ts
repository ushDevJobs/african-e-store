import { Request, Response } from "express";
import Stripe from "stripe";
import { prisma } from "../prisma";
import {
  convertToSubcurrency,
  generateRandomNumbers,
  returnJSONError,
  returnJSONSuccess,
} from "../utils/functions";
import { OrderQuantity, RequestUser } from "../types";

const stripe = new Stripe(process.env.STRIPE_S_KEY!, {
  typescript: true,
});

export const paymentIntent = async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  const cart: OrderQuantity = req.body.id;
  const { amount, products } = await getTotal(cart);
  const order = await prisma.order.create({
    data: {
      amount,
      orderId: generateRandomNumbers(7),
      userId: user.id,
      orderDetails: {
        createMany: {
          data: products.map((product) => ({
            amount: product.amount,
            quantity: cart.find((q) => q.id === product.id)!.quantity,
            productId: product.id,
            storeId: product.store.id,
            shippingFee: product.store.shippingFee,
          })),
        },
      },
    },
    select: {
      id: true,
      orderDetails: true,
    },
  });
  try {
    const intent = await stripe.paymentIntents.create({
      amount: convertToSubcurrency(amount),
      currency: "GBP",
      automatic_payment_methods: {
        enabled: true,
      },
      description: `${products.map((p) => p.name).join(", ")}`,
      metadata: { order_id: order.id },
    });

    return returnJSONSuccess(res, {
      data: {
        clientSecret: intent.client_secret,
        orderId: order.id,
      },
    });
  } catch (error) {
    await prisma.order.delete({
      where: {
        id: order.id,
      },
    });
    returnJSONError(res, { message: "unable to initiate payment" });
  }
};
export const getAmount = async (req: Request, res: Response) => {
  const cart: { id: string; quantity: number }[] = req.body.id;

  const { amount } = await getTotal(cart);

  return returnJSONSuccess(res, { data: { amount } });
};
export const handlePaymentSuccess = async (req: Request, res: Response) => {
  const { o_id, payment_intent, redirect_status } = req.query;

  if (redirect_status && o_id && payment_intent && o_id !== "") {
    if (redirect_status === "succeeded") {
      const order = await prisma.order.update({
        where: {
          id: o_id as string,
        },
        data: {
          paymentStatus: true,
          transactionId: payment_intent as string,
          datePaid: new Date(),
        },
        select: {
          id: true,
          amount: true,
          orderDetails: true,
        },
      });
      try {
        await prisma.$transaction(
          order.orderDetails.map((q) =>
            prisma.product.update({
              where: {
                id: q.id,
              },
              data: {
                quantity: {
                  decrement: q.quantity,
                },
              },
            })
          )
        );
      } catch (error) {
        console.log(error);
      }

      res.redirect(
        `${process.env.CLIENT_URL}/payment-success?amount=${order.amount}`
      );
    } else {
      res.redirect(`${process.env.CLIENT_URL}/payment-failure`);
    }
  }
};
const getTotal = async (cart: { id: string; quantity: number }[]) => {
  const settings = await prisma.settings.findFirstOrThrow({
    select: {
      profitPercent: true,
    },
  });
  const products = await prisma
    .$extends({
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
    })
    .product.findMany({
      where: {
        id: {
          in: cart.map((cart: any) => cart.id) as [],
        },
      },
      select: {
        name: true,
        id: true,
        amount: true,
        storeId: true,
        store: {
          select: {
            id: true,
            shippingFee: true,
          },
        },
      },
    });
  const productAmount = products
    .map(
      (product) =>
        product.amount *
        (cart.find((cart) => cart.id === product.id)?.quantity || 1)
    )
    .reduce((x, y) => x + y, 0);

  const filteredProducts: any[] = [];
  products.filter(
    (product) =>
      !filteredProducts.find((fp) => fp.storeId === product.storeId) &&
      filteredProducts.push(product)
  );
  const SHiPPING_FEE = filteredProducts
    .map((product) => product.store.shippingFee)
    .reduce((x, y) => x + y, 0);
  const amount = (productAmount + parseFloat(SHiPPING_FEE)).toFixed(2);
  return { amount: parseFloat(amount), products };
};

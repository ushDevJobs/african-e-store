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
      quantity: cart,
      products: {
        connect: products.map((product) => ({ id: product.id })),
      },
      orderId: generateRandomNumbers(7),
      userId: user.id,
      status: {
        create: Array.from(
          new Set(products.map((product) => product.storeId))
        ).map((id) => ({ storeId: id })),
      },
      stores: {
        connect: products.map((product) => ({ id: product.storeId })),
      },
    },
    select: {
      id: true,
      quantity: true,
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
          payment_status: true,
          transaction_id: payment_intent as string,
          date_paid: new Date(),
        },
        select: {
          id: true,
          amount: true,
          quantity: true,
        },
      });
      try {
        await prisma.$transaction(
          order.quantity.map((q) =>
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
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: cart.map((cart: any) => cart.id) as [],
      },
    },
    select: {
      name: true,
      id: true,
      modifiedAmount: true,
      storeId: true,
      store: {
        select: {
          shippingFee: true,
        },
      },
    },
  });
  const productAmount = products
    .map(
      async (product) =>
        (await product.modifiedAmount) *
        (cart.find((cart) => cart.id === product.id)?.quantity || 1)
    )
    .reduce(async (x, y) => {
      return (await x) + (await y);
    });

  const filteredProducts: any[] = [];
  products.filter(
    (product) =>
      !filteredProducts.find((fp) => fp.storeId === product.storeId) &&
      filteredProducts.push(product)
  );
  const SHiPPING_FEE = filteredProducts
    .map((product) => product.store.shippingFee)
    .reduce((x, y) => x + y, 0);
  const amount = ((await productAmount) + parseFloat(SHiPPING_FEE)).toFixed(2);
  return { amount: parseFloat(amount), products };
};

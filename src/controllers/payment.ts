import { Request, Response } from "express";
import Stripe from "stripe";
import { prisma } from "../prisma";
import {
  convertToSubcurrency,
  generateRandomNumbers,
  returnJSONError,
  returnJSONSuccess,
} from "../utils/functions";
import { OrderQuantity, OrderStatus, RequestUser } from "../types";

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
          new Set(products.map((product) => ({ storeId: product.storeId })))
        ),
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
      currency: "EUR",
      automatic_payment_methods: {
        enabled: true,
      },
      description: "You're about to pay",
      metadata: { orderId: order.id },
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
          amount: true,
        },
      });
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
      amount: true,
      storeId: true,
    },
  });
  const productAmount = products
    .map(
      (product) =>
        product.amount *
        (cart.find((cart) => cart.id === product.id)?.quantity || 1)
    )
    .reduce((x, y, i, e) => {
      return x + y;
    }, 0);
  const SHiPPING_FEE =
    Array.from(new Set(products.map((product) => product.storeId))).length *
    2.99;
  const amount = productAmount + SHiPPING_FEE;
  return { amount, products };
};

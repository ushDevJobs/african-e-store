import { Request, Response } from "express";
import Stripe from "stripe";
import { prisma } from "../prisma";
import { convertToSubcurrency, returnJSONSuccess } from "../utils/functions";
import { RequestUser } from "../types";

const stripe = new Stripe(process.env.STRIPE_S_KEY!, {
  typescript: true,
});
export const checkout = async (req: Request, res: Response) => {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: "http://localhost:2500/payment/success",
    cancel_url: "http://localhost:2500/payment/cancel",
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "Iphone 13 Pro Max",
            description: "yeh yeh",
            metadata: {
              id: "kdkdkdkdkd",
              order_id: "fff",
            },
          },
          unit_amount: 500 * 100,
        },
        quantity: 2,
        tax_rates: ["40"],
      },
    ],
  });
  res.json({
    id: session.id,
    url: session.url,
  });
};
export const paymentIntent = async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  const cart: { id: string; quantity: number }[] = req.body.id;
  const { amount, products } = await getTotal(cart);
  const order = await prisma.order.create({
    data: {
      amount,
      quantity: JSON.stringify(cart),
      shippingDetails: "{}",
      products: {
        connect: products.map((product) => ({ id: product.id })),
      },
      userId: user.id,
      storeId: "clxzbyp0q0001n7p96lu2xg1w",
    },
    select: {
      id: true,
    },
  });
  const intent = await stripe.paymentIntents.create({
    amount: convertToSubcurrency(amount + 2),
    currency: "EUR",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  return returnJSONSuccess(res, {
    data: {
      clientSecret: intent.client_secret,
      orderId: order.id,
    },
  });
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
          payment_status: "SUCCEEDED",
          transaction_id: payment_intent as string,
          date_paid: new Date(),
        },
        select: {
          amount: true,
        },
      });
      res.redirect(
        `http://localhost:2500/payment-success?amount=${order.amount}`
      );
    } else {
      const order = await prisma.order.update({
        where: {
          id: o_id as string,
        },
        data: {
          payment_status: "FAILED",
          transaction_id: payment_intent as string,
          date_paid: new Date(),
        },
      });
      res.redirect(
        `http://localhost:2500/payment-failed?amount=${order.amount}`
      );
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
  return { amount: productAmount, products };
};

import { Request, Response } from "express";
import Stripe from "stripe";
import { prisma } from "../prisma";
import { convertToSubcurrency, returnJSONSuccess } from "../utils/functions";

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
  const cart: { id: string; quantity: number }[] = req.body.id;
  const amount = await getTotal(cart);
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
    },
  });
};
export const getAmount = async (req: Request, res: Response) => {
  const cart: { id: string; quantity: number }[] = req.body.id;

  const amount = await getTotal(cart);
  return returnJSONSuccess(res, { data: { amount } });
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
  return productAmount;
};

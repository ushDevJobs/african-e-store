import { Request, Response } from "express";
import Stripe from "stripe";

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

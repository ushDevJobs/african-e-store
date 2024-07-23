import { z } from "zod";

export const validateAcceptPayment = z.object({
  id: z.string({ message: "Store id is required" }),
  orderId: z.string({ message: "Order id is required" }),
});

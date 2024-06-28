import { z } from "zod";
export const validateProductMutation = z.object({
  id: z.string(),
});
export const validatecreateProduct = z.object({
  name: z
    .string()
    .min(2, { message: "Product name must be more than two words" }),
  quantity: z.number().min(0).catch(0),
  condition: z.enum(["USED", "NEW", "REFURBISHED"]),
  price: z.number().min(0),
  salesType: z.enum(["ONCE", "BIDDING"]),
  category: z.string(),
  date: z.date(),
});

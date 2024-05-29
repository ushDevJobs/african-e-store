import { z } from "zod";
export const validateProductMutation = z.object({
  id: z.string(),
});

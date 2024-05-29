import { z } from "zod";
export const validateCreateStore = z.object({
  name: z.string(),
  description: z.string(),
  location: z.string().optional(),
});

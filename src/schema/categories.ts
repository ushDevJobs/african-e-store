import { z } from "zod";
export const validatePagination = z.object({
  _page: z.number().optional().catch(1),
});

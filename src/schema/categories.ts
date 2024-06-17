import { z } from "zod";
export const validatePagination = z.object({
  _page: z.number().gt(0).int().optional().catch(1),
});

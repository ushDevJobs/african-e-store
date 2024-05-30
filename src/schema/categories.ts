import { z } from "zod";
export const validatePagination = z.object({
  _limit: z.number().catch(10),
  _page: z.number().catch(0),
});

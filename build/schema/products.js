"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatecreateProduct = exports.validateProductMutation = void 0;
const zod_1 = require("zod");
exports.validateProductMutation = zod_1.z.object({
    id: zod_1.z.string(),
});
exports.validatecreateProduct = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, { message: "Product name must be more than two words" }),
    quantity: zod_1.z.coerce.number().min(0).catch(0),
    condition: zod_1.z.enum(["USED", "NEW", "REFURBISHED"]),
    price: zod_1.z.coerce.number().min(0),
    salesType: zod_1.z.enum(["ONCE", "BIDDING"]),
    category: zod_1.z.string(),
    date: zod_1.z.string().optional(),
    description: zod_1.z.string(),
    publish: zod_1.z.enum(["true", "false"]).catch("true"),
});

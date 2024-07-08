"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateStore = void 0;
const zod_1 = require("zod");
exports.validateCreateStore = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    location: zod_1.z.string().optional(),
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePagination = void 0;
const zod_1 = require("zod");
exports.validatePagination = zod_1.z.object({
    _page: zod_1.z.number().gt(0).int().optional().catch(1),
});

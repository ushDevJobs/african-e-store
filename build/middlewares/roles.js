"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutateProductCheck = mutateProductCheck;
exports.adminRoleCheck = adminRoleCheck;
exports.sellerRoleCheck = sellerRoleCheck;
exports.checkStore = checkStore;
exports.checkUserAccessibility = checkUserAccessibility;
exports.checkStoreId = checkStoreId;
const unauthorized_1 = require("../exceptions/unauthorized");
const root_1 = require("../exceptions/root");
const prisma_1 = require("../prisma");
const products_1 = require("../schema/products");
const bad_request_1 = require("../exceptions/bad-request");
const not_found_1 = require("../exceptions/not-found");
function mutateProductCheck(req, _, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const user = req.user;
        if (user.accountType === "SELLER") {
            const validated = products_1.validateProductMutation.safeParse({ id });
            if (validated.success) {
                try {
                    yield prisma_1.prisma.store.findFirstOrThrow({
                        where: {
                            userId: user.id,
                            products: {
                                some: {
                                    id: id,
                                },
                            },
                        },
                    });
                    next();
                }
                catch (error) {
                    next(new unauthorized_1.UnauthorizedException("Cant access this product", root_1.ErrorCode.UNAUTHORIZED));
                }
            }
            else {
                next(new bad_request_1.BadRequest("Invalid request parameters", root_1.ErrorCode.BAD_REQUEST));
            }
        }
        else {
            next(new unauthorized_1.UnauthorizedException("Unauthorized", root_1.ErrorCode.UNAUTHORIZED));
        }
    });
}
function adminRoleCheck(req, _, next) {
    const user = req.user;
    if (user.accountType === "ADMIN")
        next();
    else {
        next(new unauthorized_1.UnauthorizedException("Unauthorized", root_1.ErrorCode.UNAUTHORIZED));
    }
}
function sellerRoleCheck(req, _, next) {
    const user = req.user;
    if (user.accountType === "SELLER")
        next();
    else {
        next(new unauthorized_1.UnauthorizedException("Unauthorized", root_1.ErrorCode.UNAUTHORIZED));
    }
}
function checkStore(req, _, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const checkIfStore = yield prisma_1.prisma.store.findFirst({
            where: {
                userId: user.id,
            },
            select: { id: true },
        });
        if (checkIfStore)
            next();
        else {
            next(new not_found_1.NotFound("Store not found", root_1.ErrorCode.NOT_FOUND));
        }
    });
}
function checkUserAccessibility(req, _, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.query;
        if (id) {
            const user = req.user;
            const checkCart = yield prisma_1.prisma.cart.findFirst({
                where: {
                    AND: [
                        {
                            id: id,
                            userId: user.id,
                        },
                    ],
                },
                select: { id: true },
            });
            if (checkCart)
                next();
            else {
                next(new not_found_1.NotFound("Cart Item not found", root_1.ErrorCode.NOT_FOUND));
            }
        }
        else {
            next(new bad_request_1.BadRequest("Invalid Request Parameters", root_1.ErrorCode.BAD_REQUEST));
        }
    });
}
function checkStoreId(req, _, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        if (id) {
            try {
                yield prisma_1.prisma.store.findFirstOrThrow({ where: { id: id } });
                next();
            }
            catch (error) {
                next(new not_found_1.NotFound("Store not found", root_1.ErrorCode.NOT_FOUND));
            }
        }
        else {
            next(new bad_request_1.BadRequest("Invalid Request parameter", root_1.ErrorCode.BAD_REQUEST));
        }
    });
}

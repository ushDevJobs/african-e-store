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
exports.addItemToCart = exports.deleteItemFromCart = exports.getCartItems = void 0;
const prisma_1 = require("../prisma");
const functions_1 = require("../utils/functions");
const bad_request_1 = require("../exceptions/bad-request");
const root_1 = require("../exceptions/root");
const getCartItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const cart = yield prisma_1.prisma.user.findMany({
        where: {
            id: user.id,
        },
        select: {
            cartItems: {
                select: {
                    id: true,
                    quantity: true,
                    product: {
                        select: {
                            name: true,
                            id: true,
                            details: true,
                            coverImage: true,
                            itemCondition: true,
                            store: {
                                select: {
                                    name: true,
                                    id: true,
                                    image: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    (0, functions_1.returnJSONSuccess)(res, {
        data: cart[0].cartItems,
        count: cart[0].cartItems.length,
    });
});
exports.getCartItems = getCartItems;
const deleteItemFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    yield prisma_1.prisma.cart.delete({
        where: {
            id: id,
        },
    });
    (0, functions_1.returnJSONSuccess)(res);
});
exports.deleteItemFromCart = deleteItemFromCart;
const addItemToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const user = req.user;
    if (id) {
        try {
            yield prisma_1.prisma.cart.upsert({
                where: {
                    productId_userId: {
                        productId: id,
                        userId: user.id,
                    },
                },
                update: {
                    quantity: {
                        increment: 1,
                    },
                },
                create: {
                    productId: id,
                    userId: user.id,
                },
            });
            return (0, functions_1.returnJSONSuccess)(res);
        }
        catch (error) {
            return (0, functions_1.returnJSONError)(res, { message: "Unable to add to cart" });
        }
    }
    else {
        next(new bad_request_1.BadRequest("Invalid Request Parameters", root_1.ErrorCode.BAD_REQUEST));
    }
});
exports.addItemToCart = addItemToCart;

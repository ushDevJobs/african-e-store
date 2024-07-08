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
exports.deleteItemFromCart = exports.getOrderById = exports.getOrders = void 0;
const prisma_1 = require("../prisma");
const functions_1 = require("../utils/functions");
const categories_1 = require("../schema/categories");
const bad_request_1 = require("../exceptions/bad-request");
const root_1 = require("../exceptions/root");
const not_found_1 = require("../exceptions/not-found");
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { _limit, _page } = req.query;
    const user = req.user;
    const validatedPag = categories_1.validatePagination.safeParse({
        _page: +_page,
    });
    const count = yield prisma_1.prisma.order.count({ where: { userId: user.id } });
    const page = (+((_a = validatedPag.data) === null || _a === void 0 ? void 0 : _a._page) - 1) * (_limit ? +_limit : count);
    const orders = yield prisma_1.prisma.order.findMany({
        skip: page,
        take: +_limit || undefined,
        where: {
            userId: user.id,
        },
        select: {
            id: true,
            quantity: true,
            amount: true,
            status: true,
            trackingId: true,
            products: {
                select: {
                    name: true,
                    id: true,
                    details: true,
                    itemCondition: true,
                    coverImage: true,
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
    });
    (0, functions_1.returnJSONSuccess)(res, {
        data: orders,
        totalPages: Math.ceil(count / (_limit ? +_limit : count)),
        hasMore: ((_b = validatedPag.data) === null || _b === void 0 ? void 0 : _b._page) * (_limit ? +_limit : count) < count,
    });
});
exports.getOrders = getOrders;
const getOrderById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id) {
        try {
            const order = yield prisma_1.prisma.order.findFirstOrThrow({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    quantity: true,
                    amount: true,
                    status: true,
                    trackingId: true,
                    products: {
                        select: {
                            name: true,
                            id: true,
                            details: true,
                            itemCondition: true,
                            coverImage: true,
                            store: {
                                select: {
                                    id: true,
                                    name: true,
                                    image: true,
                                },
                            },
                        },
                    },
                },
            });
            (0, functions_1.returnJSONSuccess)(res);
        }
        catch (error) {
            next(new not_found_1.NotFound("Order not found", root_1.ErrorCode.NOT_FOUND));
        }
    }
    else {
        next(new bad_request_1.BadRequest("Invalid request parameters", root_1.ErrorCode.BAD_REQUEST));
    }
});
exports.getOrderById = getOrderById;
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

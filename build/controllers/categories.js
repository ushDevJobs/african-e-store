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
exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.getCategories = void 0;
const prisma_1 = require("../prisma");
const functions_1 = require("../utils/functions");
const categories_1 = require("../schema/categories");
const bad_request_1 = require("../exceptions/bad-request");
const root_1 = require("../exceptions/root");
const not_found_1 = require("../exceptions/not-found");
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { _limit, _page } = req.query;
    const user = req.user;
    const addFavourite = req.isAuthenticated()
        ? {
            favourite: {
                where: {
                    id: user.id,
                },
                select: {
                    id: true,
                },
            },
        }
        : {};
    let products = req.query.products === undefined
        ? true
        : req.query.products === null
            ? true
            : req.query.products;
    const validatedPag = categories_1.validatePagination.safeParse({
        _page: +_page,
    });
    const count = yield prisma_1.prisma.category.count({
        where: {
            AND: [
                {
                    products: {
                        some: {
                            id: {
                                not: undefined,
                            },
                        },
                    },
                },
                {
                    products: {
                        some: {
                            publish: true,
                        },
                    },
                },
            ],
        },
    });
    const page = (+((_a = validatedPag.data) === null || _a === void 0 ? void 0 : _a._page) - 1) * (_limit ? +_limit : count);
    const condition = req.query.condition === undefined
        ? null
        : req.query.condition === null
            ? null
            : req.query.condition === ""
                ? null
                : req.query.condition;
    let addCondition = {};
    if (condition) {
        if (condition.toLocaleLowerCase() === "1") {
            addCondition = {
                itemCondition: "NEW",
            };
        }
        else if (condition.toLocaleLowerCase() === "2") {
            addCondition = {
                itemCondition: "USED",
            };
        }
        else if (condition.toLocaleLowerCase() === "3") {
            addCondition = {
                itemCondition: "REFURBISHED",
            };
        }
    }
    const fetchProduct = products === true || products === "true"
        ? {
            products: {
                where: Object.assign({ publish: true }, addCondition),
                select: Object.assign({ id: true, name: true, itemCondition: true, salesType: true, amount: true, quantity: true, details: true, coverImage: true }, addFavourite),
            },
        }
        : {};
    const countProducts = products === true || products === "true"
        ? {
            _count: {
                select: {
                    products: true,
                },
            },
        }
        : {};
    const categories = yield prisma_1.prisma.category.findMany({
        skip: page,
        take: +_limit || undefined,
        where: {
            AND: [
                {
                    products: {
                        some: {
                            id: {
                                not: undefined,
                            },
                        },
                    },
                },
                {
                    products: {
                        some: {
                            publish: true,
                        },
                    },
                },
            ],
        },
        select: Object.assign(Object.assign({ id: true, name: true, createdAt: true }, fetchProduct), countProducts),
    });
    return (0, functions_1.returnJSONSuccess)(res, {
        data: categories,
        totalPages: Math.ceil(count / (_limit ? +_limit : count)),
        hasMore: ((_b = validatedPag.data) === null || _b === void 0 ? void 0 : _b._page) * (_limit ? +_limit : count) < count,
    });
});
exports.getCategories = getCategories;
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { _limit, _page } = req.query;
    const validatedPag = categories_1.validatePagination.safeParse({
        _page: +_page,
    });
    const count = yield prisma_1.prisma.category.count({});
    const page = (+((_a = validatedPag.data) === null || _a === void 0 ? void 0 : _a._page) - 1) * (_limit ? +_limit : count);
    const categories = yield prisma_1.prisma.category.findMany({
        skip: page,
        take: +_limit || undefined,
        select: {
            id: true,
            name: true,
            createdAt: true,
        },
    });
    return (0, functions_1.returnJSONSuccess)(res, {
        data: categories,
        totalPages: Math.ceil(count / (_limit ? +_limit : count)),
        hasMore: ((_b = validatedPag.data) === null || _b === void 0 ? void 0 : _b._page) * (_limit ? +_limit : count) < count,
    });
});
exports.getAllCategories = getAllCategories;
const getCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const { _limit, _page } = req.query;
    const user = req.user;
    const addFavourite = req.isAuthenticated()
        ? {
            favourite: {
                where: {
                    id: user.id,
                },
                select: {
                    id: true,
                },
            },
        }
        : {};
    const validatedPag = categories_1.validatePagination.safeParse({
        _page: +_page,
    });
    if (id) {
        const categoryWithProducts = yield prisma_1.prisma.category.findFirst({
            where: {
                id,
            },
            skip: ((_a = validatedPag.data) === null || _a === void 0 ? void 0 : _a._page) - 1,
            take: +_limit || undefined,
            select: {
                id: true,
                name: true,
                createdAt: true,
                products: {
                    where: {
                        publish: true,
                    },
                    select: Object.assign({ id: true, name: true, itemCondition: true, salesType: true, amount: true, quantity: true, details: true, coverImage: true }, addFavourite),
                },
            },
        });
        if (!categoryWithProducts) {
            return next(new not_found_1.NotFound("Category not found", root_1.ErrorCode.NOT_FOUND));
        }
        return (0, functions_1.returnJSONSuccess)(res, { data: categoryWithProducts });
    }
    else {
        next(new bad_request_1.BadRequest("Invalid request parameters", root_1.ErrorCode.BAD_REQUEST));
    }
});
exports.getCategoryById = getCategoryById;
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    if (id && name && name !== "") {
        const category = yield prisma_1.prisma.category.update({
            where: {
                id,
            },
            data: {
                name: name,
            },
        });
        if (!category) {
            return next(new not_found_1.NotFound("Category not found", root_1.ErrorCode.NOT_FOUND));
        }
        return (0, functions_1.returnJSONSuccess)(res, { data: category });
    }
    else {
        next(new bad_request_1.BadRequest("Invalid request parameters", root_1.ErrorCode.BAD_REQUEST));
    }
});
exports.updateCategory = updateCategory;

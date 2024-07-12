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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewsForStoreById = exports.getReviewsForLoggedInUser = exports.getCategoriesfromStoreById = exports.getStoreCategories = exports.getFavouriteStores = exports.removeStoreFromFavourite = exports.addStoreToFavourite = exports.updateStoreProfile = exports.updateStoreDescription = exports.getStoreDraftProducts = exports.getStoreProducts = exports.searchStoreProducts = exports.createStore = exports.getProductsOfStoreById = exports.getStoreById = exports.getStoreByUserLogged = exports.getPositiveReview = exports.searchForStore = exports.getAllStores = void 0;
const prisma_1 = require("../prisma");
const functions_1 = require("../utils/functions");
const not_found_1 = require("../exceptions/not-found");
const root_1 = require("../exceptions/root");
const store_1 = require("../schema/store");
const categories_1 = require("../schema/categories");
const bad_request_1 = require("../exceptions/bad-request");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("../utils/logger"));
const getAllStores = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const user = req.user;
        const { _limit, _page } = req.query;
        const validatedPag = categories_1.validatePagination.safeParse({
            _page: +_page,
        });
        const count = yield prisma_1.prisma.store.count();
        const page = (+((_a = validatedPag.data) === null || _a === void 0 ? void 0 : _a._page) - 1) * (_limit ? +_limit : count);
        const stores = yield prisma_1.prisma.store.findMany({
            skip: page,
            take: +_limit || undefined,
            select: {
                id: true,
                name: true,
                description: true,
                image: true,
                location: true,
                user: {
                    select: {
                        fullname: true,
                    },
                },
                favourite: {
                    where: {
                        id: user.id,
                    },
                    select: {
                        id: true,
                    },
                },
            },
        });
        return (0, functions_1.returnJSONSuccess)(res, {
            data: stores,
            totalPages: Math.ceil(count / (_limit ? +_limit : count)),
            hasMore: ((_b = validatedPag.data) === null || _b === void 0 ? void 0 : _b._page) * (_limit ? +_limit : count) < count,
        });
    }
    catch (error) {
        next(new not_found_1.NotFound("Store not found", root_1.ErrorCode.NOT_FOUND));
    }
});
exports.getAllStores = getAllStores;
const searchForStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { q } = req.query;
    if (q && q !== "") {
        const stores = yield prisma_1.prisma.store.findMany({
            where: {
                name: {
                    contains: q,
                },
            },
        });
        return (0, functions_1.returnJSONSuccess)(res, { data: stores });
    }
    else {
        next(new bad_request_1.BadRequest("Invalid request parameters", root_1.ErrorCode.BAD_REQUEST));
    }
});
exports.searchForStore = searchForStore;
const getStoreFullDetails = (id_1, ...args_1) => __awaiter(void 0, [id_1, ...args_1], void 0, function* (id, isStoreId = false) {
    const query = isStoreId ? { id: id } : { userId: id };
    const store = yield prisma_1.prisma.store.findFirstOrThrow({
        where: Object.assign({}, query),
        select: {
            name: true,
            id: true,
            description: true,
            image: true,
        },
    });
    const ratings = yield prisma_1.prisma.rating.groupBy({
        where: {
            AND: [
                { storeId: store.id },
                { NOT: { orderId: undefined } },
                { NOT: { productId: undefined } },
            ],
        },
        by: ["rating"],
        _count: true,
    });
    let avg = yield prisma_1.prisma.rating.aggregate({
        where: {
            AND: [
                { storeId: store.id },
                { NOT: { orderId: undefined } },
                { NOT: { productId: undefined } },
            ],
        },
        _avg: {
            rating: true,
        },
        _count: true,
        _sum: {
            rating: true,
        },
    });
    const totalItemSold = yield prisma_1.prisma.order.count({
        where: {
            AND: [{ status: "DELIVERED" }, { storeId: store.id }],
        },
    });
    const totalRatingByUsers = yield prisma_1.prisma.rating.groupBy({
        where: {
            AND: [{ storeId: store.id }, { NOT: { orderId: undefined } }],
        },
        by: ["userId", "orderId"],
    });
    const feedback = (((avg._sum.rating || 0) / totalRatingByUsers.length || 0) * 100) / 5;
    const findRating = (number) => {
        const rate = ratings.find((rating) => rating.rating === number);
        return {
            percentage: (((rate === null || rate === void 0 ? void 0 : rate._count) || 0) / avg._count) * 100 || 0,
            total: (rate === null || rate === void 0 ? void 0 : rate._count) || 0,
            rating: number,
        };
    };
    const ratingWithPercent = [
        Object.assign({}, findRating(1)),
        Object.assign({}, findRating(2)),
        Object.assign({}, findRating(3)),
        Object.assign({}, findRating(4)),
        Object.assign({}, findRating(5)),
    ];
    return {
        storeDetails: store,
        avgRating: avg._avg,
        ratingWithPercent,
        feedback: parseInt(feedback.toFixed(0)),
        totalItemSold,
    };
});
const getPositiveReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let positiveReview = yield prisma_1.prisma.rating.aggregate({
        where: {
            AND: [
                { storeId: id },
                { NOT: { orderId: undefined } },
                { NOT: { productId: undefined } },
                {
                    rating: {
                        gte: 4,
                    },
                },
            ],
        },
        _count: {
            rating: true,
        },
        _sum: {
            rating: true,
        },
    });
    const positiveFeedback = (((positiveReview._sum.rating || 0) / (positiveReview._count.rating || 0)) *
        100) /
        5;
    return positiveFeedback ? positiveFeedback : 0;
});
exports.getPositiveReview = getPositiveReview;
const getStoreByUserLogged = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        return (0, functions_1.returnJSONSuccess)(res, { data: yield getStoreFullDetails(user.id) });
    }
    catch (error) {
        next(new not_found_1.NotFound("Store not found", root_1.ErrorCode.NOT_FOUND));
    }
});
exports.getStoreByUserLogged = getStoreByUserLogged;
const getStoreById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (id) {
            return (0, functions_1.returnJSONSuccess)(res, {
                data: yield getStoreFullDetails(id, true),
            });
        }
        else {
            next(new bad_request_1.BadRequest("Invalid Request Parameters", root_1.ErrorCode.NOT_FOUND));
        }
    }
    catch (error) {
        next(new not_found_1.NotFound("Store not found", root_1.ErrorCode.NOT_FOUND));
    }
});
exports.getStoreById = getStoreById;
const getProductsOfStoreById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id && id !== "") {
        const categories = yield getCategory(id);
        return (0, functions_1.returnJSONSuccess)(res, { data: categories });
    }
    else {
        next(new bad_request_1.BadRequest("Invalid request parameters", root_1.ErrorCode.BAD_REQUEST));
    }
});
exports.getProductsOfStoreById = getProductsOfStoreById;
const createStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    store_1.validateCreateStore.parse(req.body);
    const checkIfStore = yield yield prisma_1.prisma.store.findFirst({
        where: {
            userId: user.id,
        },
    });
    if (!checkIfStore) {
        const store = yield prisma_1.prisma.store.create({
            data: Object.assign(Object.assign({}, req.body), { userId: user.id }),
        });
        return res.status(200).json({ status: true, data: store });
    }
    return res.status(200).json({ status: true, data: checkIfStore });
});
exports.createStore = createStore;
const searchStoreProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { q } = req.query;
    if (q && q !== "") {
        const store = yield prisma_1.prisma.store.findFirstOrThrow({
            where: {
                userId: user.id,
            },
        });
        const products = yield prisma_1.prisma.product.findMany({
            where: {
                AND: [
                    { storeId: store.id },
                    { publish: true },
                    {
                        name: {
                            contains: q,
                        },
                    },
                ],
            },
        });
        return res.status(200).json({ status: true, data: products });
    }
    else {
        next(new bad_request_1.BadRequest("Invalid request parameters", root_1.ErrorCode.BAD_REQUEST));
    }
});
exports.searchStoreProducts = searchStoreProducts;
const getStoreProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const store = yield prisma_1.prisma.store.findFirstOrThrow({
        where: { userId: user.id },
        select: { id: true },
    });
    const categories = yield prisma_1.prisma.store.findFirstOrThrow({
        where: {
            id: store.id,
        },
        select: {
            products: {
                where: {
                    publish: true,
                },
                select: {
                    id: true,
                    name: true,
                    itemCondition: true,
                    salesType: true,
                    amount: true,
                    quantity: true,
                    details: true,
                    coverImage: true,
                    images: true,
                    publish: true,
                },
            },
        },
    });
    return res.status(200).json({ status: true, data: categories.products });
});
exports.getStoreProducts = getStoreProducts;
const getStoreDraftProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const store = yield prisma_1.prisma.store.findFirstOrThrow({
        where: { userId: user.id },
        select: { id: true },
    });
    const categories = yield prisma_1.prisma.store.findFirstOrThrow({
        where: {
            id: store.id,
        },
        select: {
            products: {
                where: {
                    publish: false,
                },
                select: {
                    id: true,
                    name: true,
                    itemCondition: true,
                    salesType: true,
                    amount: true,
                    quantity: true,
                    details: true,
                    coverImage: true,
                    images: true,
                    publish: true,
                },
            },
        },
    });
    return res.status(200).json({ status: true, data: categories.products });
});
exports.getStoreDraftProducts = getStoreDraftProducts;
const updateStoreDescription = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { description } = req.body;
    if (description && description !== "") {
        const updateDescription = yield prisma_1.prisma.store.update({
            where: {
                userId: user.id,
            },
            data: {
                description,
            },
            select: {
                description: true,
            },
        });
        return (0, functions_1.returnJSONSuccess)(res, { data: updateDescription });
    }
    else {
        next(new bad_request_1.BadRequest("Invalid Request Parameters", root_1.ErrorCode.BAD_REQUEST));
    }
});
exports.updateStoreDescription = updateStoreDescription;
const updateStoreProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { name, description } = req.body;
    const storeImage = yield prisma_1.prisma.store.findFirstOrThrow({
        where: { userId: user.id },
        select: { image: true },
    });
    const image = req.file;
    let tempName = !!name && name !== ""
        ? {
            name: name,
        }
        : {};
    let tempDescription = !!description && description !== ""
        ? {
            description: description,
        }
        : {};
    let tempImage = !!(image === null || image === void 0 ? void 0 : image.filename) && (image === null || image === void 0 ? void 0 : image.filename) !== ""
        ? {
            image: (0, functions_1.extractFullUrlStore)(req) + (image === null || image === void 0 ? void 0 : image.filename),
        }
        : {};
    const data = Object.assign(Object.assign(Object.assign({}, tempName), tempDescription), tempImage);
    const store = yield prisma_1.prisma.store.update({
        where: {
            userId: user.id,
        },
        data,
        select: {
            name: true,
            description: true,
            image: true,
        },
    });
    if (storeImage.image && storeImage.image !== "") {
        fs_1.default.unlink(path_1.default.resolve(__dirname, `../images/store/${storeImage.image}`), (error) => {
            if (error) {
                logger_1.default.error("Unable to delete image");
            }
        });
    }
    (0, functions_1.returnJSONSuccess)(res);
});
exports.updateStoreProfile = updateStoreProfile;
const addStoreToFavourite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const user = req.user;
    if (id) {
        try {
            yield prisma_1.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    favouriteStores: {
                        connect: [{ id }],
                    },
                },
            });
            return (0, functions_1.returnJSONSuccess)(res);
        }
        catch (error) {
            return (0, functions_1.returnJSONError)(res, { message: "Unable to add to favourite" });
        }
    }
    else {
        next(new bad_request_1.BadRequest("Invalid Request Parameter", root_1.ErrorCode.BAD_REQUEST));
    }
});
exports.addStoreToFavourite = addStoreToFavourite;
const removeStoreFromFavourite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user;
    if (id) {
        try {
            yield prisma_1.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    favouriteStores: {
                        disconnect: [{ id }],
                    },
                },
            });
            return (0, functions_1.returnJSONSuccess)(res);
        }
        catch (error) {
            return (0, functions_1.returnJSONError)(res, { message: "Unable to add to favourite" });
        }
    }
    else {
        next(new bad_request_1.BadRequest("Invalid Request Parameter", root_1.ErrorCode.BAD_REQUEST));
    }
});
exports.removeStoreFromFavourite = removeStoreFromFavourite;
const getFavouriteStores = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const favourite = yield prisma_1.prisma.user.findFirstOrThrow({
            where: {
                id: user.id,
            },
            select: {
                favouriteStores: true,
            },
        });
        const superFavStore = yield Promise.all(favourite.favouriteStores.map((fav) => getStoreFullDetails(fav.userId)));
        const favouriteStores = superFavStore.every((store) => Object.keys(store).length > 1)
            ? superFavStore
            : [];
        (0, functions_1.returnJSONSuccess)(res, { data: favouriteStores });
    }
    catch (error) {
        next(new not_found_1.NotFound("User not found", root_1.ErrorCode.NOT_FOUND));
    }
});
exports.getFavouriteStores = getFavouriteStores;
const getStoreCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const categories = yield getCategory(user.id, false);
    return (0, functions_1.returnJSONSuccess)(res, { data: categories });
});
exports.getStoreCategories = getStoreCategories;
const getCategoriesfromStoreById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id && id !== "") {
        const categories = yield getCategory(id);
        return (0, functions_1.returnJSONSuccess)(res, { data: categories });
    }
    else {
        next(new bad_request_1.BadRequest("Invalid request parameters", root_1.ErrorCode.BAD_REQUEST));
    }
});
exports.getCategoriesfromStoreById = getCategoriesfromStoreById;
const getCategory = (id_1, ...args_1) => __awaiter(void 0, [id_1, ...args_1], void 0, function* (id, store = true) {
    const condition = store ? { id: id } : { userId: id };
    const categories = yield prisma_1.prisma.category.findMany({
        where: {
            AND: [
                {
                    products: {
                        some: {
                            OR: [
                                { storeId: id },
                                {
                                    store: {
                                        userId: id,
                                    },
                                },
                            ],
                        },
                    },
                },
                {
                    products: {
                        some: {
                            id: {
                                not: undefined,
                            },
                        },
                    },
                },
            ],
        },
        select: {
            name: true,
            id: true,
            createdAt: true,
            products: true,
        },
    });
    return categories;
});
const getReviewsForLoggedInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const store = yield prisma_1.prisma.store.findFirstOrThrow({
        where: { userId: user.id },
        select: { id: true },
    });
    const reviews = yield getReviewsForStore(store.id);
    (0, functions_1.returnJSONSuccess)(res, { data: reviews });
});
exports.getReviewsForLoggedInUser = getReviewsForLoggedInUser;
const getReviewsForStoreById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const reviews = yield getReviewsForStore(id);
    return (0, functions_1.returnJSONSuccess)(res, { data: reviews });
});
exports.getReviewsForStoreById = getReviewsForStoreById;
const getReviewsForStore = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield prisma_1.prisma.rating.findMany({
        where: {
            AND: [
                { storeId: id },
                { orderId: { not: undefined } },
                { productId: { not: undefined } },
            ],
        },
        select: {
            rating: true,
            review: true,
            id: true,
            user: {
                select: {
                    fullname: true,
                    id: true,
                },
            },
            product: {
                select: {
                    name: true,
                    id: true,
                    coverImage: true,
                },
            },
        },
    });
    return reviews;
});

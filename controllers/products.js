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
exports.removeProductFromFavourite = exports.addProductToFavourite = exports.getFavouriteProducts = exports.deleteProductById = exports.getProductById = exports.addProduct = exports.updateProduct = void 0;
const prisma_1 = require("../prisma");
const functions_1 = require("../utils/functions");
const products_1 = require("../schema/products");
const root_1 = require("../exceptions/root");
const bad_request_1 = require("../exceptions/bad-request");
const not_found_1 = require("../exceptions/not-found");
const datebase_exception_1 = require("../exceptions/datebase-exception");
const store_1 = require("./store");
const updateProduct = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateProduct = updateProduct;
const addProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const imagesArray = req.files;
    const images = imagesArray.map((image) => (0, functions_1.extractFullUrlProducts)(req) + image.filename);
    if (images.length === 0) {
        next(new bad_request_1.BadRequest("Upload one or more image(s)", root_1.ErrorCode.BAD_REQUEST));
    }
    const validatedProduct = products_1.validatecreateProduct.parse(req.body);
    const storeId = yield prisma_1.prisma.store.findFirstOrThrow({
        where: { userId: user.id },
        select: { id: true },
    });
    try {
        console.log(req.body.date);
        yield prisma_1.prisma.product.create({
            data: {
                coverImage: images.length > 0 ? images[0] : "",
                itemCondition: validatedProduct.condition,
                name: validatedProduct.name,
                amount: validatedProduct.price,
                endBiddingDate: req.body.data && req.body.date !== ""
                    ? new Date(req.body.date) || null
                    : null,
                images: JSON.stringify(images),
                details: validatedProduct.description,
                quantity: validatedProduct.quantity,
                publish: validatedProduct.publish === "false" ? false : true,
                storeId: storeId.id,
                categories: {
                    connect: [{ id: req.body.category }],
                },
            },
        });
        return (0, functions_1.returnJSONSuccess)(res);
    }
    catch (error) {
        const generatedError = (0, functions_1.createPrismaError)(error);
        if (generatedError) {
            next(new datebase_exception_1.DatabaseException(generatedError, 400, root_1.ErrorCode.DUPLICATE_FIELD, error));
        }
        else {
            next(new datebase_exception_1.DatabaseException("Failed to create product", root_1.ErrorCode.FAILED_TO_ADD_PRODUCT, 500, error));
        }
    }
});
exports.addProduct = addProduct;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { id } = req.params;
    let product = yield prisma_1.prisma.product.findFirst({
        where: {
            AND: [{ id }, { publish: true }],
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
            store: true,
            discount: true,
            discountPercentage: true,
            images: true,
            favourite: {
                where: {
                    id: user.id,
                },
                select: {
                    id: true,
                },
            },
            endBiddingDate: true,
            returnPolicy: true,
        },
    });
    const rating = yield prisma_1.prisma.rating.aggregate({
        where: {
            AND: [{ NOT: { orderId: undefined } }, { productId: id }],
        },
        _avg: {
            rating: true,
        },
        _count: {
            rating: true,
        },
    });
    const productRatings = yield prisma_1.prisma.rating.findMany({
        where: {
            AND: [{ NOT: { orderId: undefined } }, { productId: id }],
        },
        select: {
            user: {
                select: {
                    fullname: true,
                },
            },
            rating: true,
            createdAt: true,
            id: true,
            review: true,
        },
    });
    let avgRating = (rating._avg.rating || 0).toString().includes(".")
        ? (rating._avg.rating || 0).toFixed(1)
        : (rating._avg.rating || 0).toFixed(0);
    return (0, functions_1.returnJSONSuccess)(res, {
        data: product,
        avgRating: parseFloat(avgRating),
        totalRating: rating._count.rating || 0,
        storePositiveFeeback: yield (0, store_1.getPositiveReview)(product === null || product === void 0 ? void 0 : product.store.id),
        productRatings,
    });
});
exports.getProductById = getProductById;
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield prisma_1.prisma.product.delete({
        where: {
            id,
        },
    });
    return (0, functions_1.returnJSONSuccess)(res);
});
exports.deleteProductById = deleteProductById;
const getFavouriteProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const favourite = yield prisma_1.prisma.user.findFirstOrThrow({
            where: {
                id: user.id,
            },
            select: {
                favouriteProducts: {
                    where: {
                        publish: true,
                    },
                    include: {
                        store: true,
                    },
                },
            },
        });
        (0, functions_1.returnJSONSuccess)(res, { data: favourite.favouriteProducts });
    }
    catch (error) {
        next(new not_found_1.NotFound("User not found", root_1.ErrorCode.NOT_FOUND));
    }
});
exports.getFavouriteProducts = getFavouriteProducts;
const addProductToFavourite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const user = req.user;
    if (id) {
        try {
            yield prisma_1.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    favouriteProducts: {
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
exports.addProductToFavourite = addProductToFavourite;
const removeProductFromFavourite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user;
    if (id) {
        try {
            yield prisma_1.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    favouriteProducts: {
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
exports.removeProductFromFavourite = removeProductFromFavourite;

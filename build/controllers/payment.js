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
exports.handlePaymentSuccess = exports.getAmount = exports.paymentIntent = exports.checkout = void 0;
const stripe_1 = __importDefault(require("stripe"));
const prisma_1 = require("../prisma");
const functions_1 = require("../utils/functions");
const stripe = new stripe_1.default(process.env.STRIPE_S_KEY, {
    typescript: true,
});
const checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield stripe.checkout.sessions.create({
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/payment/success`,
        cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
        line_items: [
            {
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: "Iphone 13 Pro Max",
                        description: "yeh yeh",
                        metadata: {
                            id: "kdkdkdkdkd",
                            order_id: "fff",
                        },
                    },
                    unit_amount: 500 * 100,
                },
                quantity: 2,
                tax_rates: ["40"],
            },
        ],
    });
    res.json({
        id: session.id,
        url: session.url,
    });
});
exports.checkout = checkout;
const paymentIntent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const cart = req.body.id;
    const { amount, products } = yield getTotal(cart);
    const order = yield prisma_1.prisma.order.create({
        data: {
            amount,
            quantity: JSON.stringify(cart),
            shippingDetails: "{}",
            products: {
                connect: products.map((product) => ({ id: product.id })),
            },
            userId: user.id,
            storeId: "clxzbyp0q0001n7p96lu2xg1w",
        },
        select: {
            id: true,
        },
    });
    try {
        const intent = yield stripe.paymentIntents.create({
            amount: (0, functions_1.convertToSubcurrency)(amount + 2),
            currency: "EUR",
            automatic_payment_methods: {
                enabled: true,
            },
        });
        if (intent.id) {
            yield prisma_1.prisma.order.update({
                where: {
                    id: order.id,
                },
                data: {
                    transaction_id: intent.id,
                },
            });
        }
        return (0, functions_1.returnJSONSuccess)(res, {
            data: {
                clientSecret: intent.client_secret,
                orderId: order.id,
            },
        });
    }
    catch (error) {
        yield prisma_1.prisma.order.delete({
            where: {
                id: order.id,
            },
        });
        (0, functions_1.returnJSONError)(res, { message: "unable to initiate payment" });
    }
});
exports.paymentIntent = paymentIntent;
const getAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = req.body.id;
    const { amount } = yield getTotal(cart);
    return (0, functions_1.returnJSONSuccess)(res, { data: { amount } });
});
exports.getAmount = getAmount;
const handlePaymentSuccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { o_id, payment_intent, redirect_status } = req.query;
    if (redirect_status && o_id && payment_intent && o_id !== "") {
        if (redirect_status === "succeeded") {
            const order = yield prisma_1.prisma.order.update({
                where: {
                    id: o_id,
                },
                data: {
                    payment_status: "SUCCEEDED",
                    transaction_id: payment_intent,
                    date_paid: new Date(),
                },
                select: {
                    amount: true,
                },
            });
            res.redirect(`${process.env.CLIENT_URL}/payment-success?amount=${order.amount}`);
        }
        else {
            const order = yield prisma_1.prisma.order.update({
                where: {
                    id: o_id,
                },
                data: {
                    payment_status: "FAILED",
                    transaction_id: payment_intent,
                    date_paid: new Date(),
                },
            });
            res.redirect(`${process.env.CLIENT_URL}/payment-failure?amount=${order.amount}`);
        }
    }
});
exports.handlePaymentSuccess = handlePaymentSuccess;
const getTotal = (cart) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma_1.prisma.product.findMany({
        where: {
            id: {
                in: cart.map((cart) => cart.id),
            },
        },
        select: {
            name: true,
            id: true,
            amount: true,
        },
    });
    const productAmount = products
        .map((product) => {
        var _a;
        return product.amount *
            (((_a = cart.find((cart) => cart.id === product.id)) === null || _a === void 0 ? void 0 : _a.quantity) || 1);
    })
        .reduce((x, y, i, e) => {
        return x + y;
    }, 0);
    return { amount: productAmount, products };
});

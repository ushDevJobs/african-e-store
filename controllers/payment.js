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
exports.checkout = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_S_KEY, {
    typescript: true,
});
const checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield stripe.checkout.sessions.create({
        mode: "payment",
        success_url: "http://localhost:2500/payment/success",
        cancel_url: "http://localhost:2500/payment/cancel",
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSellerRegData = exports.validateRegData = exports.validateLoginData = void 0;
const zod_1 = require("zod");
const passwordErrorMessage = "Password must contain at least 4 character(s)";
const phoneErrorMessage = "Phone number must contain at least 10 character(s)";
const countryErrorMessage = "Country must contain at least 11 character(s)";
exports.validateLoginData = zod_1.z.object({
    email: zod_1.z.string({ message: "email is required" }).email(),
    password: zod_1.z
        .string({ message: "password is required" })
        .min(2, passwordErrorMessage),
});
exports.validateRegData = zod_1.z
    .object({
    email: zod_1.z.string({ message: "email is required" }).email(),
    fullname: zod_1.z.string({ message: "fullname is required" }).min(2),
    password: zod_1.z
        .string({ message: "password is required" })
        .min(4, passwordErrorMessage),
    confirmPassword: zod_1.z
        .string({ message: "password is required" })
        .min(4, passwordErrorMessage),
    telephone: zod_1.z
        .string({ message: "telephone is required" })
        .min(10, phoneErrorMessage),
    country: zod_1.z.string().min(2, countryErrorMessage).optional(),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["confirmPassword"],
});
exports.validateSellerRegData = zod_1.z
    .object({
    email: zod_1.z.string({ message: "email is required" }).email(),
    fullname: zod_1.z.string({ message: "fullname is required" }).min(2),
    companyName: zod_1.z.string({ message: "Company name is required" }).min(2),
    password: zod_1.z
        .string({ message: "password is required" })
        .min(4, passwordErrorMessage),
    confirmPassword: zod_1.z
        .string({ message: "password is required" })
        .min(4, passwordErrorMessage),
    telephone: zod_1.z
        .string({ message: "telephone is required" })
        .min(10, phoneErrorMessage),
    country: zod_1.z.string().min(2, countryErrorMessage).optional(),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["confirmPassword"],
});

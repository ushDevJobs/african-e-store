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
exports.initializePassport = void 0;
const passport_local_1 = require("passport-local");
const prisma_1 = require("../prisma");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const users_1 = require("../schema/users");
const bcrypt_1 = require("bcrypt");
const root_1 = require("../exceptions/root");
const initializePassport = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user === null || user === void 0 ? void 0 : user.id);
    });
    passport.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield prisma_1.prisma.user.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                    email: true,
                    accountType: true,
                },
            });
            done(null, user);
        }
        catch (error) {
            done(error, null);
        }
    }));
    passport.use(new passport_local_1.Strategy({ usernameField: "email", passReqToCallback: true }, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!req.isAuthenticated()) {
            try {
                const parsed = users_1.validateLoginData.safeParse({ email, password });
                if (!parsed.success) {
                    return done(null, false, {
                        message: req.flash("error", [
                            parsed.error.errors[0].message,
                            "422",
                            parsed.error.errors[0].message.includes("email")
                                ? "" + root_1.ErrorCode.INVALID_EMAIL
                                : "" + root_1.ErrorCode.UNPROCESSABLE_ENTITY,
                        ]),
                    });
                }
                const user = yield prisma_1.prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                    select: {
                        id: true,
                        email: true,
                        accountType: true,
                        password: true,
                    },
                });
                if (!user) {
                    return done(null, false, {
                        message: req.flash("error", [
                            "No user with that email",
                            "404",
                            "" + root_1.ErrorCode.USER_NOT_FOUND,
                        ]),
                    });
                }
                if ((0, bcrypt_1.compareSync)((_a = parsed.data) === null || _a === void 0 ? void 0 : _a.password, user.password || "")) {
                    let newUser = {
                        id: user.id,
                        email: user.email,
                        accountType: user.accountType,
                    };
                    return done(null, newUser);
                }
                else {
                    return done(null, false, {
                        message: req.flash("error", [
                            "Invalid credentials",
                            "400",
                            "" + root_1.ErrorCode.INVALID_CREDENTIALS,
                        ]),
                    });
                }
            }
            catch (error) {
                done(error);
            }
        }
        else {
            done(null, req.user);
        }
    })));
    passport.use(new passport_google_oauth20_1.Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/auth/google/callback",
        passReqToCallback: true,
    }, (req, accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.isAuthenticated()) {
            const user = yield prisma_1.prisma.user.findFirst({
                where: {
                    OR: [
                        {
                            googleId: profile.id,
                        },
                        {
                            email: profile._json.email,
                        },
                    ],
                },
                select: {
                    id: true,
                    email: true,
                    accountType: true,
                    googleId: true,
                },
            });
            if (!user) {
                if (profile._json.email) {
                    try {
                        const createUser = yield prisma_1.prisma.user.create({
                            data: {
                                fullname: profile.displayName,
                                email: profile._json.email,
                                googleId: profile.id,
                                status: profile._json.email_verified
                                    ? "VERIFIED"
                                    : "PENDING",
                                accountType: "BUYER",
                                profilePicture: profile._json.picture,
                            },
                            select: {
                                id: true,
                                email: true,
                                accountType: true,
                            },
                        });
                        return done(null, createUser);
                    }
                    catch (error) {
                        return done(error);
                    }
                }
                else {
                    return done(null, false, { message: "No email present" });
                }
            }
            if (!user.googleId) {
                yield prisma_1.prisma.user.update({
                    where: {
                        email: user.email,
                    },
                    data: {
                        googleId: profile.id,
                    },
                });
            }
            return done(null, {
                id: user.id,
                email: user.email,
                accountType: user.accountType,
            });
        }
        else {
            return done(null, req.user);
        }
    })));
};
exports.initializePassport = initializePassport;

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
exports.logout = exports.verifyOTP = exports.googleAuthError = exports.loginAuthError = exports.registerSeller = exports.resendOTP = exports.register = exports.accountStatus = void 0;
const functions_1 = require("../utils/functions");
const prisma_1 = require("../prisma");
const bad_request_1 = require("../exceptions/bad-request");
const root_1 = require("../exceptions/root");
const users_1 = require("../schema/users");
const bcrypt_1 = require("bcrypt");
const internal_exception_1 = require("../exceptions/internal-exception");
const not_found_1 = require("../exceptions/not-found");
const accountStatus = (req, res) => {
    res.json(req.user);
};
exports.accountStatus = accountStatus;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    users_1.validateRegData.parse(req.body);
    const findUser = yield prisma_1.prisma.user.findFirst({
        where: { email: req.body.email },
    });
    if (!findUser) {
        let user = yield prisma_1.prisma.user.create({
            data: {
                email: req.body.email,
                fullname: req.body.fullname,
                telephone: req.body.telephone,
                country: req.body.country,
                password: (0, bcrypt_1.hashSync)(req.body.password, 10),
            },
            select: {
                id: true,
                email: true,
                password: true,
            },
        });
        const id = yield sendOtp(user.id, user.email);
        if (id) {
            return (0, functions_1.returnJSONSuccess)(res, { userId: id });
        }
        else {
            yield prisma_1.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    status: "FAILED",
                },
            });
            next(new internal_exception_1.InternalException("Could'nt send mail", root_1.ErrorCode.MAIL_ERROR, null));
        }
    }
    else {
        if (findUser.status !== "VERIFIED") {
            const id = yield sendOtp(findUser.id, findUser.email);
            if (id) {
                return (0, functions_1.returnJSONSuccess)(res, { userId: id });
            }
            else {
                yield prisma_1.prisma.user.update({
                    where: {
                        id: findUser.id,
                    },
                    data: {
                        status: "FAILED",
                    },
                });
                next(new internal_exception_1.InternalException("Could'nt send mail", root_1.ErrorCode.MAIL_ERROR, null));
            }
        }
        next(new bad_request_1.BadRequest("User already exist", root_1.ErrorCode.USER_ALREADY_EXIST));
    }
});
exports.register = register;
const resendOTP = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    if (id) {
        try {
            const user = yield prisma_1.prisma.user.findFirstOrThrow({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    email: true,
                    status: true,
                },
            });
            if (user.status !== "VERIFIED") {
                const userId = yield sendOtp(user.id, user.email);
                if (userId) {
                    yield prisma_1.prisma.user.update({
                        where: {
                            id: user.id,
                        },
                        data: {
                            status: "PENDING",
                        },
                    });
                    return (0, functions_1.returnJSONSuccess)(res, { userId: id });
                }
                next(new internal_exception_1.InternalException("Could'nt send mail", root_1.ErrorCode.MAIL_ERROR, null));
            }
            else {
                next(new bad_request_1.BadRequest("Already verified", root_1.ErrorCode.BAD_REQUEST));
            }
        }
        catch (error) {
            next(new bad_request_1.BadRequest("User not found", root_1.ErrorCode.BAD_REQUEST));
        }
    }
    else {
        next(new bad_request_1.BadRequest("Invalid Request Parameters", root_1.ErrorCode.BAD_REQUEST));
    }
});
exports.resendOTP = resendOTP;
const registerSeller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    users_1.validateSellerRegData.parse(req.body);
    const findUser = yield prisma_1.prisma.user.findFirst({
        where: { email: req.body.email },
    });
    if (!findUser) {
        let user = yield prisma_1.prisma.user.create({
            data: {
                email: req.body.email,
                fullname: req.body.fullname,
                accountType: "SELLER",
                country: req.body.country,
                telephone: req.body.telephone,
                password: (0, bcrypt_1.hashSync)(req.body.password, 10),
                store: {
                    create: {
                        name: req.body.companyName,
                        description: "",
                        location: req.body.country,
                    },
                },
            },
            select: {
                id: true,
                email: true,
                password: true,
            },
        });
        const id = yield sendOtp(user.id, user.email);
        if (id) {
            return (0, functions_1.returnJSONSuccess)(res, { userId: id });
        }
        else {
            yield prisma_1.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    status: "FAILED",
                },
            });
            next(new internal_exception_1.InternalException("Could'nt send mail", root_1.ErrorCode.MAIL_ERROR, null));
        }
    }
    else {
        if (findUser.status !== "VERIFIED") {
            const id = yield sendOtp(findUser.id, findUser.email);
            if (id) {
                return (0, functions_1.returnJSONSuccess)(res, { userId: id });
            }
            else {
                yield prisma_1.prisma.user.update({
                    where: {
                        id: findUser.id,
                    },
                    data: {
                        status: "FAILED",
                    },
                });
                next(new internal_exception_1.InternalException("Could'nt send mail", root_1.ErrorCode.MAIL_ERROR, null));
            }
        }
        next(new bad_request_1.BadRequest("User already exist", root_1.ErrorCode.USER_ALREADY_EXIST));
    }
});
exports.registerSeller = registerSeller;
prisma_1.prisma.user.findMany({
    select: {},
});
const loginAuthError = (req, res) => {
    let message = req.flash("error");
    res.status(message[1] ? +message[1] : 401).json({
        status: false,
        message: message[0] ? message[0] : "Something went wrong",
        errorCode: message[2] ? +message[2] : root_1.ErrorCode.BAD_REQUEST,
    });
};
exports.loginAuthError = loginAuthError;
const googleAuthError = (req, res) => {
    let message = req.flash("error");
    res.status(401).json({
        status: false,
        message: message[0],
    });
};
exports.googleAuthError = googleAuthError;
const sendOtp = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = (0, functions_1.generateRandomNumbers)(5);
    let minuteToExpire = 300000; // 5 mins
    if (id) {
        const otpUser = yield prisma_1.prisma.verifyUser.upsert({
            where: {
                userId: id,
            },
            update: {
                userId: id,
                expiresAt: new Date(Date.now() + minuteToExpire),
                otp: (0, bcrypt_1.hashSync)("" + otp, 10),
            },
            create: {
                userId: id,
                expiresAt: new Date(Date.now() + minuteToExpire),
                otp: (0, bcrypt_1.hashSync)("" + otp, 10),
            },
            select: {
                id: true,
            },
        });
        const mailResponse = yield (0, functions_1.sendEmail)("Rayvvin Team", "Welcome to Rayvvin.", email, `<p>Welcome to Rayvvin. Please verify your account using the One Time Password provided below. <p><b>${otp}</b></p>. This OTP expires in 5 minutes. <br/>
      Best Regard.
      <br /> 
      Rayvvin Team</p>`);
        if (mailResponse.status) {
            return id;
        }
        else {
            yield prisma_1.prisma.verifyUser.delete({
                where: {
                    id: otpUser.id,
                },
            });
        }
    }
});
const verifyOTP = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, code } = req.body;
    if (id && code) {
        try {
            const otp = yield prisma_1.prisma.verifyUser.findFirstOrThrow({
                where: {
                    userId: id,
                },
            });
            if (!(0, bcrypt_1.compareSync)(code, otp.otp)) {
                return (0, functions_1.returnJSONError)(res, { message: "Wrong Code" }, 401);
            }
            if (otp.expiresAt.valueOf() < new Date().valueOf()) {
                // otp expired
                yield prisma_1.prisma.$transaction([
                    prisma_1.prisma.user.update({
                        where: {
                            id: otp.userId,
                        },
                        data: {
                            status: "FAILED",
                        },
                    }),
                    prisma_1.prisma.verifyUser.delete({
                        where: {
                            userId: otp.userId,
                        },
                    }),
                ]);
                return (0, functions_1.returnJSONError)(res, { message: "OTP expired" }, 401);
            }
            else {
                let [user, _] = yield prisma_1.prisma.$transaction([
                    prisma_1.prisma.user.update({
                        where: {
                            id: otp.userId,
                        },
                        data: {
                            status: "VERIFIED",
                        },
                        select: {
                            id: true,
                            email: true,
                            accountType: true,
                        },
                    }),
                    prisma_1.prisma.verifyUser.delete({
                        where: {
                            userId: otp.userId,
                        },
                    }),
                ]);
                req.logIn(user, function (err) {
                    if (err) {
                        throw err;
                    }
                    return res.status(200).json(Object.assign({ status: true }, req.user));
                });
            }
        }
        catch (error) {
            next(new not_found_1.NotFound("Failed to find OTP", root_1.ErrorCode.NOT_FOUND));
        }
    }
    else {
        next(new bad_request_1.BadRequest("Invalid Request Parameters", root_1.ErrorCode.BAD_REQUEST));
    }
});
exports.verifyOTP = verifyOTP;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({ status: true });
    });
});
exports.logout = logout;

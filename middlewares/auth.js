"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = checkAuth;
const unauthorized_1 = require("../exceptions/unauthorized");
const root_1 = require("../exceptions/root");
function checkAuth(req, res, next) {
    if (req.isAuthenticated())
        next();
    else {
        next(new unauthorized_1.UnauthorizedException("User not authenticated", root_1.ErrorCode.NOT_LOGGED_IN, 403));
    }
}

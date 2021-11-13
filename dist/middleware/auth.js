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
exports.verifyIsAdmin = exports.verifyIsSeller = exports.verifyIsSellersModel = exports.verifyToken = void 0;
const user_1 = require("../models/user");
const util_1 = require("../util");
const index_1 = require("../index");
const verifyToken = (request, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = getToken(request);
        if (!token) {
            (0, util_1.sendFailResponse)(res, 403, "A token is required for authentication");
            return;
        }
        const decoded = yield index_1.jwrt.verify(token, process.env.TOKEN_KEY);
        request.user = decoded;
        return next();
    }
    catch (err) {
        if (err.name === "TokenDestroyedError") {
            (0, util_1.sendFailResponse)(res, 401, "Token Destroyed Error");
            return;
        }
        (0, util_1.sendFailResponse)(res, 401, "Invalid Token");
    }
});
exports.verifyToken = verifyToken;
const getToken = (request) => {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    return token;
};
// eslint-disable-next-line @typescript-eslint/ban-types
const verifyIsSellersModel = (model) => (request, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = request.params.id;
        if (yield (0, util_1.isWrongId)(model, itemId)) {
            throw new Error("Wrong item id");
        }
        const item = yield model.findById(request.params.id);
        const itemSellerID = item.seller.toString();
        const sellersID = (yield request.user).user_id;
        if (sellersID !== itemSellerID) {
            (0, util_1.sendFailResponse)(res, 401, "You do not have a permission!");
            return;
        }
        return next();
    }
    catch (err) {
        (0, util_1.sendFailResponse)(res, 400, err.message);
    }
});
exports.verifyIsSellersModel = verifyIsSellersModel;
const verifyIsSeller = (request, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isSeller = yield verifyRole(request, res, user_1.Role.SELLER);
        if (!isSeller) {
            (0, util_1.sendFailResponse)(res, 401, "You do not have a permission!");
            return;
        }
        return next();
    }
    catch (err) {
        (0, util_1.sendFailResponse)(res, 400, err.message);
    }
});
exports.verifyIsSeller = verifyIsSeller;
const verifyIsAdmin = (request, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAdmin = yield verifyRole(request, res, user_1.Role.ADMIN);
        if (!isAdmin) {
            (0, util_1.sendFailResponse)(res, 401, "You do not have a permission!");
            return;
        }
        return next();
    }
    catch (err) {
        (0, util_1.sendFailResponse)(res, 400, err.message);
    }
});
exports.verifyIsAdmin = verifyIsAdmin;
const verifyRole = (request, res, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gottenRole = (yield user_1.User.findById((yield request.user).user_id)).role.toString();
        const isAdmin = gottenRole === role;
        return isAdmin;
    }
    catch (err) {
        (0, util_1.sendFailResponse)(res, 400, err.message);
    }
});
//# sourceMappingURL=auth.js.map
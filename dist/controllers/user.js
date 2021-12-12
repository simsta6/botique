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
exports.getBuyersAndSellers = exports.deleteUser = exports.postSeller = exports.getSellers = exports.logout = exports.login = exports.register = exports.getUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const util_1 = require("../util");
const index_1 = require("../index");
const auth_1 = require("../middleware/auth");
const getUser = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.params.id;
        if (yield (0, util_1.isWrongId)(user_1.User, userId)) {
            (0, util_1.idDoesNotExist)(res);
            return;
        }
        const user = yield user_1.User.findById(userId).select("first_name last_name");
        res.status(200).send((0, util_1.constructResponse)("Success", user));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.getUser = getUser;
//USER
const register = (request, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, email, password } = request.body;
        if (!(email && password && first_name && last_name)) {
            (0, util_1.sendFailResponse)(res, 400, "All input is required");
            return;
        }
        const oldUser = yield user_1.User.findOne({ email });
        if (oldUser) {
            (0, util_1.sendFailResponse)(res, 409, "User Already Exist. Please Login");
            return;
        }
        const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield user_1.User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });
        user.token = yield createToken(user._id, email);
        res.cookie("token", user.token, { httpOnly: true });
        res.status(201).send((0, util_1.constructResponse)("Success", user));
        return next();
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.register = register;
const login = (request, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((0, util_1.isBodyEmpty)(request))
            throw new Error();
        const { email, password } = request.body;
        if (!(email && password)) {
            (0, util_1.sendFailResponse)(res, 400, "All input is required");
            return;
        }
        const user = yield user_1.User.findOne({ email });
        if (user && (yield bcrypt_1.default.compare(password, user.password))) {
            user.token = yield createToken(user._id, email);
            res.cookie("token", user.token, { sameSite: "none", secure: true });
            res.status(200).send((0, util_1.constructResponse)("Success", user));
            return next();
        }
        (0, util_1.sendFailResponse)(res, 400, "Invalid Credentials");
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.login = login;
const logout = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = (0, auth_1.getToken)(request);
        const jti = index_1.jwrt.decode(token).jti;
        if (!jti) {
            (0, util_1.sendFailResponse)(res, 401, "You are logged out");
            return;
        }
        index_1.jwrt.destroy(jti);
        res.status(204).send((0, util_1.constructResponse)("Success"));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.logout = logout;
//X USER END
//SELLER
const getSellers = (_request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.where("role").equals(user_1.Role.SELLER).select("_id first_name last_name email");
        res.status(200).send((0, util_1.constructResponse)("Success", users));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.getSellers = getSellers;
//X SELLER END
// ADMIN
const postSeller = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, email, password } = request.body;
        if (!(email && password && first_name && last_name)) {
            (0, util_1.sendFailResponse)(res, 400, "All input is required");
            return;
        }
        const oldUser = yield user_1.User.findOne({ email });
        if (oldUser) {
            (0, util_1.sendFailResponse)(res, 409, "Seller Already Exist. Please use different email");
            return;
        }
        const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield user_1.User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            role: user_1.Role.SELLER,
        });
        res.status(201).send((0, util_1.constructResponse)("Success", user));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.postSeller = postSeller;
const deleteUser = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.params.id;
        if (yield (0, util_1.isWrongId)(user_1.User, userId)) {
            (0, util_1.idDoesNotExist)(res);
            return;
        }
        const wasDeleted = yield user_1.User.findById(userId).then(user => user.role.toString() === user_1.Role.ADMIN ? false : (user.delete(), true));
        if (!wasDeleted)
            throw new Error("You do not have a permission!");
        res.status(204).send();
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.deleteUser = deleteUser;
const getBuyersAndSellers = (_request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.where("role").in([user_1.Role.BUYER, user_1.Role.SELLER]).select("_id first_name last_name email role");
        res.status(200).send((0, util_1.constructResponse)("Success", users));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.getBuyersAndSellers = getBuyersAndSellers;
//X ADMIN END
const createToken = (user_id, email) => {
    return index_1.jwrt.sign({ user_id, email }, process.env.TOKEN_KEY, { expiresIn: "2h" });
};
//# sourceMappingURL=user.js.map
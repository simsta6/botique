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
exports.login = exports.register = exports.changeUserInfo = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const util_1 = require("../util");
const data_1 = require("./../data");
const changeUserInfo = (request, res) => {
    try {
        const userId = +request.params.id;
        if (!(0, util_1.isIdExists)(data_1.users, userId)) {
            (0, util_1.idDoesNotExist)(res);
            return;
        }
        if (isNaN(userId) || (0, util_1.isBodyEmpty)(request))
            throw new Error();
        res.status(200).send((0, util_1.constructResponse)("Success"));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, error.message);
    }
};
exports.changeUserInfo = changeUserInfo;
const register = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((0, util_1.isBodyEmpty)(request))
            throw new Error();
        const { first_name, last_name, email, password } = request.body;
        if (!(email && password && first_name && last_name)) {
            (0, util_1.sendFailResponse)(res, 400, "All input is required");
            return;
        }
        const oldUser = yield user_1.userModel.findOne({ email });
        if (oldUser) {
            (0, util_1.sendFailResponse)(res, 409, "User Already Exist. Please Login");
            return;
        }
        const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield user_1.userModel.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });
        user.token = createToken(user._id, email);
        res.status(201).send((0, util_1.constructResponse)("Success"));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, error.message);
    }
});
exports.register = register;
const login = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((0, util_1.isBodyEmpty)(request))
            throw new Error();
        const { email, password } = request.body;
        if (!(email && password)) {
            (0, util_1.sendFailResponse)(res, 400, "All input is required");
            return;
        }
        const user = yield user_1.userModel.findOne({ email });
        if (user && (yield bcrypt_1.default.compare(password, user.password))) {
            user.token = createToken(user._id, email);
            res.status(200).json(user);
        }
        (0, util_1.sendFailResponse)(res, 400, "Invalid Credentials");
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, error.message);
    }
});
exports.login = login;
const createToken = (user_id, email) => {
    return jsonwebtoken_1.default.sign({ user_id, email }, process.env.TOKEN_KEY, { expiresIn: "2h" });
};
//# sourceMappingURL=user.js.map
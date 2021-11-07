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
exports.deleteUser = exports.postSeller = exports.getSellers = exports.changeOrderState = exports.editItem = exports.deleteItem = exports.postItem = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const item_1 = require("../models/item");
const data_1 = require("../data");
const user_1 = require("../models/user");
const util_1 = require("../util");
//USER
const register = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        user.token = createToken(user._id, email);
        res.status(201).send((0, util_1.constructResponse)("Success", user));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
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
        const user = yield user_1.User.findOne({ email });
        if (user && (yield bcrypt_1.default.compare(password, user.password))) {
            user.token = createToken(user._id, email);
            res.status(200).send((0, util_1.constructResponse)("Success", user));
            return;
        }
        (0, util_1.sendFailResponse)(res, 400, "Invalid Credentials");
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.login = login;
//X USER END
//SELLER
const postItem = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = request.body;
        const { isValid, message } = isItemValid(item);
        if (!isValid)
            throw new Error(message);
        const newItem = yield item_1.Item.create(Object.assign(Object.assign({}, item), { seller: (0, util_1.ObjectId)(request.user.user_id) }));
        res.status(201).send((0, util_1.constructResponse)("Success", newItem));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.postItem = postItem;
const deleteItem = (request, res) => {
    try {
        const itemId = +request.params.id;
        if (!(0, util_1.isIdExists)(data_1.items, itemId)) {
            (0, util_1.idDoesNotExist)(res);
            return;
        }
        if (isNaN(itemId))
            throw new Error();
        res.status(200).send((0, util_1.constructResponse)("Success"));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
};
exports.deleteItem = deleteItem;
const editItem = (request, res) => {
    try {
        const itemId = +request.params.id;
        const newItem = request.body;
        if (!(0, util_1.isIdExists)(data_1.items, itemId)) {
            (0, util_1.idDoesNotExist)(res);
            return;
        }
        if (isNaN(itemId) || (0, util_1.isBodyEmpty)(request) || newItem.color === "")
            throw new Error();
        const newItemWithId = Object.assign(Object.assign({}, newItem), { id: itemId });
        data_1.items.map(item => item.id === itemId && newItemWithId);
        res.status(200).send((0, util_1.constructResponse)("Success", newItemWithId));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
};
exports.editItem = editItem;
const changeOrderState = (request, res) => {
    try {
        const orderId = +request.params.id;
        if (!(0, util_1.isIdExists)(data_1.orders, orderId)) {
            (0, util_1.idDoesNotExist)(res);
            return;
        }
        if (isNaN(orderId) || (0, util_1.isBodyEmpty)(request))
            throw new Error();
        const newOrderState = request.body;
        data_1.orders.forEach(x => x.id === orderId && (x.state = newOrderState));
        res.status(200).send((0, util_1.constructResponse)("Success"));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
};
exports.changeOrderState = changeOrderState;
const getSellers = (_request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.where("role").equals(user_1.Role.SELLER);
        res.status(200).send((0, util_1.constructResponse)("Success", users));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.getSellers = getSellers;
const isItemValid = (item) => {
    const { brand, color, count, size, price, imageUrl } = item;
    if (!(brand && color && count && size && price && imageUrl))
        return { isValid: false, message: "You need to fill all fields!" };
    if (!((0, util_1.isNumeric)(count) && (0, util_1.isNumeric)(size) && (0, util_1.isNumeric)(price)))
        return { isValid: false, message: "Count, size and price should be numeric!" };
    if (!((0, util_1.isNumberPositive)(count) && (0, util_1.isNumberPositive)(size) && (0, util_1.isNumberPositive)(price)))
        return { isValid: false, message: "Count, size and price should be numeric!" };
    return { isValid: true, message: "Success" };
};
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
            throw new Error("Wrong item id");
        }
        user_1.User.findByIdAndRemove(userId, (err) => {
            if (err) {
                throw new Error(err.message);
            }
            res.status(200).send((0, util_1.constructResponse)("Success"));
        });
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.deleteUser = deleteUser;
//X ADMIN END
const createToken = (user_id, email) => {
    return jsonwebtoken_1.default.sign({ user_id, email }, process.env.TOKEN_KEY, { expiresIn: "2h" });
};
//# sourceMappingURL=user.js.map
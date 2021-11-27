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
exports.editItem = exports.deleteItem = exports.postItem = exports.getItem = exports.getAllItems = void 0;
const item_1 = require("../models/item");
const util_1 = require("../util");
const getAllItems = (_request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield item_1.Item.find();
        res.status(200).send((0, util_1.constructResponse)("Success", items));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.getAllItems = getAllItems;
const getItem = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = request.params.id;
        if (yield (0, util_1.isWrongId)(item_1.Item, request.params.id)) {
            throw new Error("Wrong item id");
        }
        const item = yield item_1.Item.findById(itemId);
        res.status(200).send((0, util_1.constructResponse)("Success", item));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.getItem = getItem;
const postItem = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = request.body;
        const { isValid, message } = isItemValid(item);
        if (!isValid)
            throw new Error(message);
        const newItem = yield item_1.Item.create(Object.assign(Object.assign({}, item), { seller: (0, util_1.ObjectId)((yield request.user).user_id) }));
        res.status(201).send((0, util_1.constructResponse)("Success", newItem));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.postItem = postItem;
const deleteItem = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = request.params.id;
        yield item_1.Item.findByIdAndDelete(itemId);
        res.status(204).send();
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.deleteItem = deleteItem;
const editItem = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = request.params.id;
        const item = request.body;
        const { isValid, message } = isItemValid(item);
        if (yield (0, util_1.isWrongId)(item_1.Item, request.params.id)) {
            throw new Error("Wrong item id");
        }
        if (!isValid)
            throw new Error(message);
        const updatedItem = yield item_1.Item.findByIdAndUpdate(itemId, Object.assign({}, item), { new: true });
        res.status(201).send((0, util_1.constructResponse)("Success", updatedItem));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.editItem = editItem;
const isItemValid = (item) => {
    const { brand, color, count, size, price, imageUrl } = item;
    if (!(brand && color && count && size && price && imageUrl))
        return { isValid: false, message: "You need to fill all fields!" };
    if (!((0, util_1.isNumberPositive)(count) && (0, util_1.isNumberPositive)(size) && (0, util_1.isNumberPositive)(price)))
        return { isValid: false, message: "Count, size and price should be numeric!" };
    return { isValid: true, message: "Success" };
};
//# sourceMappingURL=item.js.map
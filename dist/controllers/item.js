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
exports.getItem = exports.getAllItems = void 0;
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
        const item = yield item_1.Item.findById(itemId);
        res.status(200).send((0, util_1.constructResponse)("Success", item));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.getItem = getItem;
//# sourceMappingURL=item.js.map
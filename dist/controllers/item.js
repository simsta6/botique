"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemsByColor = exports.getItem = exports.getAllItems = void 0;
const data_1 = require("../data");
const util_1 = require("../util");
const getAllItems = (_request, res) => {
    try {
        res.status(200).send((0, util_1.constructResponse)("Success", data_1.items));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, error.message);
    }
};
exports.getAllItems = getAllItems;
const getItem = (request, res) => {
    try {
        const itemId = +request.params.id;
        if (!(0, util_1.isIdExists)(data_1.items, itemId)) {
            (0, util_1.idDoesNotExist)(res);
            return;
        }
        if (isNaN(itemId))
            throw new Error();
        const item = data_1.items.find(item => item.id === itemId);
        res.status(200).send((0, util_1.constructResponse)("Success", item));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, error.message);
    }
};
exports.getItem = getItem;
const getItemsByColor = (request, res) => {
    try {
        const color = request.params.color;
        if (!color)
            throw new Error();
        const filtratedItems = data_1.items.filter(item => item.color.toLowerCase() === color.toLowerCase());
        res.status(200).send((0, util_1.constructResponse)("Success", filtratedItems));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, error.message);
    }
};
exports.getItemsByColor = getItemsByColor;
//# sourceMappingURL=item.js.map
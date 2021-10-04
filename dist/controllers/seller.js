"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSellers = exports.changeOrderState = exports.editItem = exports.deleteItem = exports.postItem = void 0;
const data_1 = require("./../data");
const data_2 = require("../data");
const util_1 = require("../util");
const postItem = (request, res) => {
    try {
        const item = request.body;
        if ((0, util_1.isBodyEmpty)(request) || item.label === "" || item.color === "")
            throw new Error();
        res.status(200).send((0, util_1.constructResponse)("Success", item));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, error.message);
    }
};
exports.postItem = postItem;
const deleteItem = (request, res) => {
    try {
        const itemId = +request.params.id;
        if (isNaN(itemId) || !(0, util_1.isIdExists)(data_2.items, itemId))
            throw new Error();
        res.status(200).send((0, util_1.constructResponse)("Success"));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, error.message);
    }
};
exports.deleteItem = deleteItem;
const editItem = (request, res) => {
    try {
        const itemId = +request.params.id;
        const newItem = request.body;
        if (isNaN(itemId) || !(0, util_1.isIdExists)(data_2.items, itemId) || (0, util_1.isBodyEmpty)(request) || newItem.label === "" || newItem.color === "")
            throw new Error();
        const newItemWithId = Object.assign(Object.assign({}, newItem), { id: itemId });
        data_2.items.map(item => item.id === itemId && newItemWithId);
        res.status(200).send((0, util_1.constructResponse)("Success", newItemWithId));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, error.message);
    }
};
exports.editItem = editItem;
const changeOrderState = (request, res) => {
    try {
        const orderId = +request.params.id;
        if (isNaN(orderId) || !(0, util_1.isIdExists)(data_2.orders, orderId) || (0, util_1.isBodyEmpty)(request))
            throw new Error();
        const newOrderState = request.body;
        data_2.orders.forEach(x => x.id === orderId && (x.state = newOrderState));
        res.status(200).send((0, util_1.constructResponse)("Success"));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, error.message);
    }
};
exports.changeOrderState = changeOrderState;
const getSellers = (_request, res) => {
    try {
        res.status(200).send((0, util_1.constructResponse)("Success", data_1.sellers));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, error.message);
    }
};
exports.getSellers = getSellers;
//# sourceMappingURL=seller.js.map
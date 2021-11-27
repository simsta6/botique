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
exports.addItemToChart = exports.getAllItemsInChart = void 0;
const chart_1 = require("../models/chart");
const item_1 = require("../models/item");
const util_1 = require("../util");
const getAllItemsInChart = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemsInChart = (yield (yield chart_1.Chart.findOne({ user: (yield request.user).user_id }).populate("items.item")).items);
        res.status(200).send((0, util_1.constructResponse)("Success", itemsInChart));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.getAllItemsInChart = getAllItemsInChart;
const addItemToChart = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield (0, util_1.isWrongId)(item_1.Item, request.params.id)) {
            (0, util_1.idDoesNotExist)(res);
            return;
        }
        const count = +request.params.count;
        const itemId = (0, util_1.ObjectId)(request.params.id);
        const user = (0, util_1.ObjectId)((yield request.user).user_id);
        const chart = yield chart_1.Chart.findOne({ user: (yield request.user).user_id });
        if (!chart) {
            const returnValue = yield chart_1.Chart.create({ user, items: [{ item: itemId, count: count }] });
            res.status(200).send((0, util_1.constructResponse)("Success", returnValue));
            return;
        }
        const returnValue = yield chart_1.Chart.findByIdAndUpdate(chart._id, { items: addItemsToChart(chart.items, { item: itemId, count }) }, { new: true });
        res.status(200).send((0, util_1.constructResponse)("Success", returnValue));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.addItemToChart = addItemToChart;
const addItemsToChart = (chartItems, item) => {
    let isAddingNeeded = true;
    const result = chartItems.map(chartItem => {
        if (chartItem.item._id.toString() === item.item._id.toString()) {
            isAddingNeeded = false;
            return { item: chartItem.item, count: chartItem.count + item.count };
        }
        return chartItem;
    });
    const itemsRes = isAddingNeeded ? [...result, item] : result;
    return itemsRes;
};
//# sourceMappingURL=chart.js.map
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
const mongoose_1 = require("mongoose");
const chart_1 = require("../models/chart");
const item_1 = require("../models/item");
const util_1 = require("../util");
const ObjectId = (id) => new mongoose_1.Types.ObjectId(id);
const getAllItemsInChart = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemsInChart = (yield (yield chart_1.Chart.findOne({ user: request.user.user_id }).populate("items.item")).items);
        res.status(200).send((0, util_1.constructResponse)("Success", itemsInChart));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.getAllItemsInChart = getAllItemsInChart;
// TODO: fix bug when addding multiple items with two different ids
// gal sutaisyta,
const addItemToChart = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield (0, util_1.isWrongId)(item_1.Item, request.params.id)) {
            throw new Error("Wrong item id");
        }
        const count = +request.params.count;
        const itemId = ObjectId(request.params.id);
        const user = ObjectId(request.user.user_id);
        chart_1.Chart.findOne({ user: request.user.user_id }, (err, chart) => {
            if (err) {
                throw new Error(err.message);
            }
            if (chart) {
                const doestChartIncludesItem = chart.items.some(x => {
                    const result = x.item.toString() === itemId.toString();
                    return result;
                });
                const items = doestChartIncludesItem ?
                    chart.items.map(x => x.item.toString() === itemId.toString() ? { item: itemId, count: x.count + count } : { item: itemId, count })
                    : [...chart.items, { item: itemId, count }];
                chart_1.Chart.updateOne({ _id: chart._id }, { items }, (err) => {
                    if (err) {
                        throw new Error(err.message);
                    }
                });
                res.status(200).send((0, util_1.constructResponse)("Success"));
            }
            else {
                chart_1.Chart.create({ user, items: [{ item: itemId, count: count }] });
                res.status(200).send((0, util_1.constructResponse)("Success"));
            }
        });
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.addItemToChart = addItemToChart;
//# sourceMappingURL=chart.js.map
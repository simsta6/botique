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
exports.changeOrderState = exports.postOrder = void 0;
const chart_1 = require("../models/chart");
const order_1 = require("../models/order");
const util_1 = require("../util");
const postOrder = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (0, util_1.ObjectId)(request.user.user_id);
        chart_1.Chart.findOne({ user: request.user.user_id }, (err, chart) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                throw new Error(err.message);
            }
            if (chart) {
                const items = chart.items;
                const order = { user, items };
                const newOrder = yield order_1.Order.create(order);
                res.status(200).send((0, util_1.constructResponse)("Success", newOrder));
            }
            else {
                (0, util_1.sendFailResponse)(res, 404, "You don't have anything in your chart!");
            }
        }));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.postOrder = postOrder;
const changeOrderState = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = request.params.id;
        const state = request.body.state;
        if (!state || !Object.values(order_1.OrderState).some(availableOrderState => availableOrderState === state))
            throw new Error("Wrong state!");
        const order = yield order_1.Order.findByIdAndUpdate(orderId, { state }, { new: true });
        res.status(201).send((0, util_1.constructResponse)("Success", order));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.changeOrderState = changeOrderState;
//# sourceMappingURL=order.js.map
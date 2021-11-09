"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.OrderState = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const chart_1 = require("./chart");
var OrderState;
(function (OrderState) {
    OrderState["PENDING"] = "pending";
    OrderState["PAID"] = "paid";
    OrderState["APPROVED"] = "approved";
    OrderState["SHIPPED"] = "shipped";
    OrderState["DELIVERED"] = "delivered";
    OrderState["CANCELED"] = "canceled";
})(OrderState = exports.OrderState || (exports.OrderState = {}));
const orderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
    },
    seller: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user"
    },
    items: [chart_1.itemsSchema],
    state: {
        type: String,
        enum: OrderState,
        default: OrderState.PENDING,
    },
});
exports.Order = mongoose_1.default.model("order", orderSchema);
//# sourceMappingURL=order.js.map
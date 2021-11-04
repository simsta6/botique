"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.State = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var State;
(function (State) {
    State["WAITING_FOR_PAYMENT"] = "waiting_for_payment";
    State["WAITING_FOR_SELLER_APPROVEMENT"] = "waiting_for_seller_approvement";
    State["SHIPPED"] = "shipped";
    State["DELIVERED"] = "delivered";
    State["CANCELED"] = "canceled";
})(State = exports.State || (exports.State = {}));
const orderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
    },
    items: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "item",
        }],
    state: {
        type: String,
        enum: State,
        default: State.WAITING_FOR_PAYMENT
    },
});
exports.Order = mongoose_1.default.model("order", orderSchema);
//# sourceMappingURL=order.js.map
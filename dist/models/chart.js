"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chart = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const itemsSchema = new mongoose_1.default.Schema({
    item: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "item",
    },
    count: { type: Number },
}, { _id: false });
const chartSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
    },
    items: [itemsSchema],
});
exports.Chart = mongoose_1.default.model("chart", chartSchema);
//# sourceMappingURL=chart.js.map
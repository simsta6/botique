"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const itemSchema = new mongoose_1.default.Schema({
    brand: { type: String, required: true },
    color: { type: String, required: true },
    count: { type: Number, required: true },
    size: { type: Number, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    seller: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
    },
});
exports.Item = mongoose_1.default.model("item", itemSchema);
//# sourceMappingURL=item.js.map
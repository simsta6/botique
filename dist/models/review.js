"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
    },
    item: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "item",
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    review: { type: String },
});
exports.Review = mongoose_1.default.model("review", reviewSchema);
//# sourceMappingURL=review.js.map
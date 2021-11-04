"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Role = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var Role;
(function (Role) {
    Role["BUYER"] = "buyer";
    Role["SELLER"] = "seller";
    Role["ADMIN"] = "admin";
})(Role = exports.Role || (exports.Role = {}));
const userSchema = new mongoose_1.default.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minlength: 6, select: false },
    token: { type: String },
    role: {
        type: String,
        enum: Role,
        default: Role.BUYER
    },
});
exports.User = mongoose_1.default.model("user", userSchema);
//# sourceMappingURL=user.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const util_1 = require("../util");
const verifyToken = (req, res, next) => {
    try {
        const token = getToken(req);
        if (!token) {
            (0, util_1.sendFailResponse)(res, 403, "A token is required for authentication");
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        return next();
    }
    catch (err) {
        (0, util_1.sendFailResponse)(res, 401, "Invalid Token");
    }
};
exports.verifyToken = verifyToken;
const getToken = (req) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    return token;
};
//# sourceMappingURL=auth.js.map
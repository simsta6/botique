"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeServer = exports.startServer = exports.app = void 0;
const express_1 = __importStar(require("express"));
const database_1 = require("./config/database");
const chart_1 = require("./controllers/chart");
const item_1 = require("./controllers/item");
const order_1 = require("./controllers/order");
const review_1 = require("./controllers/review");
const user_1 = require("./controllers/user");
const auth_1 = require("./middleware/auth");
const item_2 = require("./models/item");
const order_2 = require("./models/order");
const util_1 = require("./util");
const database_2 = require("./config/database");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.connect)();
    exports.app = (0, express_1.default)();
    exports.app.use((0, express_1.json)());
    exports.app.use((0, cookie_parser_1.default)());
    exports.app.use((0, cors_1.default)({ credentials: true, origin: true }));
    const port = process.env.PORT || 5000;
    // Item
    exports.app.get("/api/items", item_1.getAllItems);
    exports.app.get("/api/items/:id", item_1.getItem);
    exports.app.post("/api/items", auth_1.verifyToken, auth_1.verifyIsSeller, item_1.postItem);
    exports.app.patch("/api/items/:id", auth_1.verifyToken, auth_1.verifyIsSeller, (0, auth_1.verifyIsUserHasThisModel)(item_2.Item), item_1.editItem);
    exports.app.delete("/api/items/:id", auth_1.verifyToken, auth_1.verifyIsSeller, (0, auth_1.verifyIsUserHasThisModel)(item_2.Item), item_1.deleteItem);
    // Chart
    exports.app.get("/api/charts", auth_1.verifyToken, chart_1.getAllItemsInChart);
    exports.app.post("/api/charts/:id/:count", auth_1.verifyToken, chart_1.addItemToChart);
    // Order
    exports.app.post("/api/orders", auth_1.verifyToken, order_1.postOrder);
    exports.app.patch("/api/orders/:id", auth_1.verifyToken, auth_1.verifyIsSeller, (0, auth_1.verifyIsUserHasThisModel)(order_2.Order), order_1.changeOrderState);
    exports.app.get("/api/orders", auth_1.verifyToken, auth_1.verifyIsSeller, order_1.getAllOrders);
    // User 
    exports.app.delete("/api/users/:id", auth_1.verifyToken, auth_1.verifyIsAdmin, user_1.deleteUser);
    exports.app.post("/api/sellers", auth_1.verifyToken, auth_1.verifyIsAdmin, user_1.postSeller);
    exports.app.get("/api/sellers", user_1.getSellers);
    exports.app.get("/api/users", auth_1.verifyToken, auth_1.verifyIsAdmin, user_1.getBuyersAndSellers);
    exports.app.post("/api/register", user_1.register);
    exports.app.post("/api/login", user_1.login);
    exports.app.post("/api/logout", auth_1.verifyToken, user_1.logout);
    // Reviews
    exports.app.post("/api/items/:id/reviews", auth_1.verifyToken, review_1.postReview);
    exports.app.get("/api/items/:id/reviews", review_1.getReviews);
    exports.app.get("/api/items/:id/reviews/:reviewId", review_1.getReview);
    exports.app.delete("/api/items/:id/reviews/:reviewId", auth_1.verifyToken, review_1.deleteReview);
    exports.app.patch("/api/items/:id/reviews/:reviewId", auth_1.verifyToken, review_1.editReview);
    exports.app.use((_req, res) => (0, util_1.sendFailResponse)(res, 404));
    server = exports.app.listen(port, () => console.log(`Running on port ${port}`));
});
exports.startServer = startServer;
const closeServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_2.closeConnection)();
    server.close();
    exports.app = null;
});
exports.closeServer = closeServer;
//# sourceMappingURL=serverStart.js.map
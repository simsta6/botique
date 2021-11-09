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
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
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
(0, dotenv_1.config)();
(0, database_1.connect)();
const server = (0, express_1.default)();
server.use((0, express_1.json)());
const port = process.env.PORT || 5000;
// Item
server.get("/api/items", item_1.getAllItems);
server.get("/api/items/:id", item_1.getItem);
server.post("/api/items", auth_1.verifyToken, auth_1.verifyIsSeller, item_1.postItem);
server.patch("/api/items/:id", auth_1.verifyToken, auth_1.verifyIsSeller, (0, auth_1.verifyIsSellersModel)(item_2.Item), item_1.editItem);
server.delete("/api/items/:id", auth_1.verifyToken, auth_1.verifyIsSeller, (0, auth_1.verifyIsSellersModel)(item_2.Item), item_1.deleteItem);
// Chart
server.get("/api/charts", auth_1.verifyToken, chart_1.getAllItemsInChart);
server.post("/api/charts/:id/:count", auth_1.verifyToken, chart_1.addItemToChart);
// Order
server.post("/api/orders", auth_1.verifyToken, order_1.postOrder);
server.patch("/api/orders/:id", auth_1.verifyToken, auth_1.verifyIsSeller, (0, auth_1.verifyIsSellersModel)(order_2.Order), order_1.changeOrderState);
// User 
server.delete("/api/users/:id", auth_1.verifyToken, auth_1.verifyIsAdmin, user_1.deleteUser);
server.post("/api/sellers", auth_1.verifyToken, auth_1.verifyIsAdmin, user_1.postSeller);
server.get("/api/sellers", user_1.getSellers);
server.post("/api/register", user_1.register);
server.post("/api/login", user_1.login);
// Reviews
server.post("/api/items/:id/reviews", auth_1.verifyToken, review_1.postReview);
server.get("/api/items/:id/reviews", review_1.getReviews);
server.get("/api/items/:id/reviews/:reviewId", review_1.getReview);
server.delete("/api/items/:id/reviews/:reviewId", auth_1.verifyToken, review_1.deleteReview);
server.patch("/api/items/:id/reviews/:reviewId", auth_1.verifyToken, review_1.editReview);
server.use((_req, res) => (0, util_1.sendFailResponse)(res, 404));
server.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map
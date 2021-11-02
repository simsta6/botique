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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const connections_1 = require("./connections");
const admin_1 = require("./controllers/admin");
const chart_1 = require("./controllers/chart");
const item_1 = require("./controllers/item");
const review_1 = require("./controllers/review");
const seller_1 = require("./controllers/seller");
const user_1 = require("./controllers/user");
const util_1 = require("./util");
const server = (0, express_1.default)();
server.use((0, express_1.json)());
const port = process.env.PORT || 5000;
(0, connections_1.connect)();
const User = mongoose_1.default.model("User", new mongoose_1.default.Schema({
    email: String
}));
User.create([{
        email: "Simas",
    }]);
// Item
server.get("/api/items", item_1.getAllItems); //                                           ITEM
server.get("/api/items/:id", item_1.getItem); //                                           ITEM
server.get("/api/items/:color", item_1.getItemsByColor); //                                ITEM
// Chart
server.get("/api/charts", chart_1.getAllItemsInChart); //                                   ITEM 
server.post("/api/charts/:id", chart_1.addItemToChart); //                                  ITEM
// User
server.patch("/api/users/:id", user_1.changeUserInfo); //                                  SELLER    
server.delete("/api/users/:id", admin_1.deleteUser); //                                     SELLER      
// Admin
server.post("/api/sellers", admin_1.postSeller); //                                         SELLER
// Seller
server.get("/api/sellers", seller_1.getSellers); //                                          SELLER
server.post("/api/items", seller_1.postItem); //                                             SELLER                    
server.patch("/api/items/:id", seller_1.editItem); //                                        SELLER
server.patch("/api/orders/:id", seller_1.changeOrderState); //                               SELLER
server.delete("/api/items/:id", seller_1.deleteItem); //                                     SELLER
// Reviews
server.post("/api/items/:id/reviews", review_1.postReview); //                               REVIEW
server.get("/api/items/:id/reviews", review_1.getReviews); //                                REVIEW
server.get("/api/items/:id/reviews/:reviewId", review_1.getReview); //                       REVIEW
server.delete("/api/items/:id/reviews/:reviewId", review_1.deleteReview); //                 REVIEW  
server.patch("/api/items/:id/reviews/:reviewId", review_1.editReview); //                    REVIEW
server.use((_req, res) => (0, util_1.sendFailResponse)(res, 404));
server.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map
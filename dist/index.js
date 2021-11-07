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
const express_1 = __importStar(require("express"));
const database_1 = require("./config/database");
const chart_1 = require("./controllers/chart");
const item_1 = require("./controllers/item");
const review_1 = require("./controllers/review");
const user_1 = require("./controllers/user");
const util_1 = require("./util");
const dotenv_1 = require("dotenv");
const auth_1 = require("./middleware/auth");
(0, dotenv_1.config)();
(0, database_1.connect)();
const server = (0, express_1.default)();
server.use((0, express_1.json)());
const port = process.env.PORT || 5000;
server.post("/api/register", user_1.register);
server.post("/api/login", user_1.login);
// Item
server.get("/api/items", item_1.getAllItems); //                                           ITEM
server.get("/api/items/:id", item_1.getItem); //                                           ITEM
// Chart
server.get("/api/charts", chart_1.getAllItemsInChart); //                                   ITEM 
server.post("/api/charts/:id", chart_1.addItemToChart); //                                  ITEM
// User 
server.delete("/api/users/:id", user_1.deleteUser); //                                           
// Admin
server.post("/api/sellers", auth_1.verifyToken, user_1.postSeller); //                            SELLER
// Seller
server.get("/api/sellers", user_1.getSellers); //                                          SELLER
server.post("/api/items", user_1.postItem); //                                             SELLER                    
server.patch("/api/items/:id", user_1.editItem); //                                        SELLER
server.patch("/api/orders/:id", user_1.changeOrderState); //                               SELLER
server.delete("/api/items/:id", user_1.deleteItem); //                                     SELLER
// Reviews
server.post("/api/items/:id/reviews", review_1.postReview); //                               REVIEW
server.get("/api/items/:id/reviews", review_1.getReviews); //                                REVIEW
server.get("/api/items/:id/reviews/:reviewId", review_1.getReview); //                       REVIEW
server.delete("/api/items/:id/reviews/:reviewId", review_1.deleteReview); //                 REVIEW  
server.patch("/api/items/:id/reviews/:reviewId", review_1.editReview); //                    REVIEW
server.use((_req, res) => (0, util_1.sendFailResponse)(res, 404));
server.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map
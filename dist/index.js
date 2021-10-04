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
const item_1 = require("./controllers/item");
const chart_1 = require("./controllers/chart");
const order_1 = require("./controllers/order");
const seller_1 = require("./controllers/seller");
const user_1 = require("./controllers/user");
const admin_1 = require("./controllers/admin");
const review_1 = require("./controllers/review");
const server = (0, express_1.default)();
server.use((0, express_1.json)());
const port = 5000;
// Item
server.get("/api/items", item_1.getAllItems); // Perziureti prekes                     ITEM
server.get("/api/items/:id", item_1.getItem); // Perziureti preke                      ITEM
server.get("/api/items/filtrate/:color", item_1.getFiltratedItems); // Filtruoti prekes         ITEM
// Chart
server.get("/api/charts", chart_1.getAllItemsInChart); // Paziureti krepseli             ITEM
server.post("/api/charts/:id", chart_1.addItemToChart); //Prideti preke i krepseli   ITEM
// Order
server.post("/api/orders", order_1.makeAnOrder); // Atlikti uzsakyma                ORDER
// User
server.patch("/api/users/:id", user_1.changeUserInfo); //                                      
// Admin
server.post("/api/sellers", admin_1.postSeller); //                                            SELLER
server.delete("/api/users/:id", admin_1.deleteUser); //           
// Seller
server.get("/api/sellers", seller_1.getSellers); //                                     SELLER
server.post("/api/items", seller_1.postItem); // Registruoti produkte                            SELLER                    
server.patch("/api/items/:id", seller_1.editItem); // Modifikuoti produkta                     SELLER
server.patch("/api/orders/:id", seller_1.changeOrderState); // Keisti uzsakymo bukle,    SELLER
server.delete("/api/items/:id", seller_1.deleteItem); //                                     SELLER
// Reviews
server.post("/api/reviews", review_1.postReview); //                                            REVIEW
server.get("/api/reviews", review_1.getReviews); //                                  REVIEW
server.get("/api/reviews/:id", review_1.getReview); //       
server.delete("/api/reviews/:id", review_1.deleteReview); //                                REVIEW  
server.patch("/api/reviews/:id", review_1.editReview); //                                     REVIEW
server.get("/api/items/:id/reviews", review_1.getItemRating); //                                REVIEW
server.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map
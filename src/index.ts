import express, { json } from "express";
import { getAllItems, getItemsByColor, getItem } from "./controllers/item";
import { getAllItemsInChart, addItemToChart } from "./controllers/chart";
import { postItem, editItem, changeOrderState, deleteItem, getSellers } from "./controllers/seller";
import { changeUserInfo } from "./controllers/user";
import { postSeller, deleteUser } from "./controllers/admin";
import { postReview, deleteReview, editReview, getReview, getReviews } from "./controllers/review";
import { sendFailResponse } from "./util";

const server = express();
server.use(json());

const port = process.env.PORT || 5000;

// Item
server.get("/api/items", getAllItems); //                                           ITEM
server.get("/api/items/:id", getItem); //                                           ITEM
server.get("/api/items/:color", getItemsByColor); //                                ITEM

// Chart
server.get("/api/charts", getAllItemsInChart); //                                   ITEM 
server.post("/api/charts/:id", addItemToChart); //                                  ITEM

// User
server.patch("/api/users/:id", changeUserInfo); //                                  SELLER    
server.delete("/api/users/:id", deleteUser); //                                     SELLER      

// Admin
server.post("/api/sellers", postSeller); //                                         SELLER
// Seller
server.get("/api/sellers", getSellers); //                                          SELLER
server.post("/api/items", postItem); //                                             SELLER                    
server.patch("/api/items/:id", editItem); //                                        SELLER
server.patch("/api/orders/:id", changeOrderState); //                               SELLER
server.delete("/api/items/:id", deleteItem); //                                     SELLER

// Reviews
server.post("/api/items/:id/reviews", postReview); //                               REVIEW
server.get("/api/items/:id/reviews", getReviews); //                                REVIEW
server.get("/api/items/:id/reviews/:reviewId", getReview); //                       REVIEW
server.delete("/api/items/:id/reviews/:reviewId", deleteReview); //                 REVIEW  
server.patch("/api/items/:id/reviews/:reviewId", editReview); //                    REVIEW


server.use((_req, res) => sendFailResponse(res, 404));

server.listen(port, () => console.log(`Running on port ${port}`));
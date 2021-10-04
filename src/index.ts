import express, { json } from "express";
import { getAllItems, getFiltratedItems, getItem } from "./controllers/item";
import { getAllItemsInChart, addItemToChart } from "./controllers/chart";
import { postItem, editItem, changeOrderState, deleteItem, getSellers } from "./controllers/seller";
import { changeUserInfo } from "./controllers/user";
import { postSeller, deleteUser } from "./controllers/admin";
import { postReview, deleteReview, editReview, getReview, getReviews, getItemRating } from "./controllers/review";

const server = express();
server.use(json());
const port = 5000;

// Item
server.get("/api/items", getAllItems); //                   ITEM
server.get("/api/items/:id", getItem); //                       ITEM
server.get("/api/items/filtrate/:color", getFiltratedItems); //          ITEM

// Chart
server.get("/api/charts", getAllItemsInChart); //              ITEM
server.post("/api/charts/:id", addItemToChart); //   ITEM

// User
server.patch("/api/users/:id", changeUserInfo); //                                      


// Admin
server.post("/api/sellers", postSeller); //                                            SELLER
server.delete("/api/users/:id", deleteUser); //           
// Seller
server.get("/api/sellers", getSellers); //                                     SELLER
server.post("/api/items", postItem); //                            SELLER                    
server.patch("/api/items/:id", editItem); //                      SELLER
server.patch("/api/orders/:id", changeOrderState); //     SELLER
server.delete("/api/items/:id", deleteItem); //                                     SELLER


// Reviews
server.post("/api/reviews", postReview); //                                            REVIEW
server.get("/api/reviews", getReviews); //                                  REVIEW
server.get("/api/reviews/:id", getReview); //       
server.delete("/api/reviews/:id", deleteReview); //                                REVIEW  
server.patch("/api/reviews/:id", editReview); //                                     REVIEW
server.get("/api/items/:id/reviews", getItemRating); //                                REVIEW

server.listen(port, () => console.log(`Running on port ${port}`));
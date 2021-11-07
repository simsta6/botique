import express, { json } from "express";
import { connect } from "./config/database";
import { addItemToChart, getAllItemsInChart } from "./controllers/chart";
import { getAllItems, getItem } from "./controllers/item";
import { deleteReview, editReview, getReview, getReviews, postReview } from "./controllers/review";
import { 
  login, register, deleteUser, postSeller, changeOrderState, deleteItem, editItem, getSellers, postItem 
} from "./controllers/user";
import { sendFailResponse } from "./util";
import { config } from "dotenv";
import { verifyToken } from "./middleware/auth";

config();

connect();
const server = express();
server.use(json());

const port = process.env.PORT || 5000;

server.post("/api/register", register);
server.post("/api/login", login);

// Item
server.get("/api/items", getAllItems); //                                           ITEM
server.get("/api/items/:id", getItem); //                                           ITEM

// Chart
server.get("/api/charts", getAllItemsInChart); //                                   ITEM 
server.post("/api/charts/:id", addItemToChart); //                                  ITEM

// User 
server.delete("/api/users/:id", deleteUser); //                                           

// Admin
server.post("/api/sellers", verifyToken, postSeller); //                            SELLER
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
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
import { verifyIsAdmin, verifyIsSeller, verifyToken } from "./middleware/auth";

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
server.get("/api/charts", verifyToken, getAllItemsInChart); //                      ITEM 
server.post("/api/charts/:id/:count", verifyToken, addItemToChart); //              ITEM

// User 
server.delete("/api/users/:id", verifyToken, verifyIsAdmin, deleteUser); //

// Admin
server.post("/api/sellers", verifyToken, verifyIsAdmin, postSeller); //             SELLER
// Seller
server.get("/api/sellers", getSellers); //                                          SELLER
server.post("/api/items", verifyToken, verifyIsSeller, postItem); //                SELLER                    
server.patch("/api/items/:id", verifyToken, verifyIsSeller, editItem); //           SELLER //TODO check if he owns this item....
server.patch("/api/orders/:id", verifyToken, verifyIsSeller, changeOrderState); //  SELLER
server.delete("/api/items/:id", verifyToken, verifyIsSeller, deleteItem); //        SELLER

// Reviews
server.post("/api/items/:id/reviews", postReview); //                               REVIEW
server.get("/api/items/:id/reviews", getReviews); //                                REVIEW
server.get("/api/items/:id/reviews/:reviewId", getReview); //                       REVIEW
server.delete("/api/items/:id/reviews/:reviewId", deleteReview); //                 REVIEW  
server.patch("/api/items/:id/reviews/:reviewId", editReview); //                    REVIEW


server.use((_req, res) => sendFailResponse(res, 404));

server.listen(port, () => console.log(`Running on port ${port}`));
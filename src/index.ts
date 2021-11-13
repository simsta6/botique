import { config } from "dotenv";
import express, { json } from "express";
import { connect } from "./config/database";
import { addItemToChart, getAllItemsInChart } from "./controllers/chart";
import { deleteItem, editItem, getAllItems, getItem, postItem } from "./controllers/item";
import { changeOrderState, postOrder } from "./controllers/order";
import { deleteReview, editReview, getReview, getReviews, postReview } from "./controllers/review";
import { deleteUser, getSellers, login, logout, postSeller, register } from "./controllers/user";
import { verifyIsAdmin, verifyIsSeller, verifyIsSellersModel, verifyToken } from "./middleware/auth";
import { Item } from "./models/item";
import { Order } from "./models/order";
import { sendFailResponse } from "./util";
import JWTRedis from "jwt-redis";
import redis from "redis";

config();

connect();
const server = express();
server.use(json());

const port = process.env.PORT || 5000;

const redisClient = redis.createClient();
redisClient.on("error", function(error) {
  console.error(error);
});
export const jwrt = new JWTRedis(redisClient);

// Item
server.get("/api/items", getAllItems);
server.get("/api/items/:id", getItem);
server.post("/api/items", verifyToken, verifyIsSeller, postItem);                  
server.patch("/api/items/:id", verifyToken, verifyIsSeller, verifyIsSellersModel(Item), editItem); 
server.delete("/api/items/:id", verifyToken, verifyIsSeller, verifyIsSellersModel(Item), deleteItem);

// Chart
server.get("/api/charts", verifyToken, getAllItemsInChart);
server.post("/api/charts/:id/:count", verifyToken, addItemToChart);

// Order
server.post("/api/orders", verifyToken, postOrder);
server.patch("/api/orders/:id", verifyToken, verifyIsSeller, verifyIsSellersModel(Order), changeOrderState);

// User 
server.delete("/api/users/:id", verifyToken, verifyIsAdmin, deleteUser);
server.post("/api/sellers", verifyToken, verifyIsAdmin, postSeller); 
server.get("/api/sellers", getSellers);
server.post("/api/register", register);
server.post("/api/login", login);
server.post("/api/logout", verifyToken, logout);

// Reviews
server.post("/api/items/:id/reviews",verifyToken, postReview);
server.get("/api/items/:id/reviews", getReviews);
server.get("/api/items/:id/reviews/:reviewId", getReview);
server.delete("/api/items/:id/reviews/:reviewId", verifyToken, deleteReview);
server.patch("/api/items/:id/reviews/:reviewId", verifyToken, editReview);


server.use((_req, res) => sendFailResponse(res, 404));

server.listen(port, () => console.log(`Running on port ${port}`));
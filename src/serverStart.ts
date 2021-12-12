import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express, json } from "express";
import { Server } from "node:http";
import { closeConnection, connect } from "./config/database";
import { addItemToChart, getAllItemsInChart } from "./controllers/chart";
import { deleteItem, editItem, getAllItems, getItem, postItem } from "./controllers/item";
import { changeOrderState, getAllOrders, postOrder } from "./controllers/order";
import { deleteReview, editReview, getReview, getReviews, postReview } from "./controllers/review";
import { deleteUser, getBuyersAndSellers, getSellers, getUser, login, logout, postSeller, register } from "./controllers/user";
import { verifyIsAdmin, verifyIsSeller, verifyIsUserHasThisModel, verifyToken } from "./middleware/auth";
import { Item } from "./models/item";
import { Order } from "./models/order";
import { sendFailResponse } from "./util";

export let app: Express;
let server: Server;

export const startServer = async (): Promise<void> => {
  await connect();

  app = express();
  app.use(json());
  app.use(cookieParser());
  // TODO: add front server ip here from .env
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

  const port = process.env.PORT || 5000;

  // Item
  app.get("/api/items", getAllItems);
  app.get("/api/items/:id", getItem);
  app.post("/api/items", verifyToken, verifyIsSeller, postItem);                  
  app.patch("/api/items/:id", verifyToken, verifyIsSeller, verifyIsUserHasThisModel(Item), editItem); 
  app.delete("/api/items/:id", verifyToken, verifyIsSeller, verifyIsUserHasThisModel(Item), deleteItem);

  // Chart
  app.get("/api/charts", verifyToken, getAllItemsInChart);
  app.post("/api/charts/:id/:count", verifyToken, addItemToChart);

  // Order
  app.post("/api/orders", verifyToken, postOrder);
  app.patch("/api/orders/:id", verifyToken, verifyIsSeller, verifyIsUserHasThisModel(Order), changeOrderState);
  app.get("/api/orders", verifyToken, verifyIsSeller, getAllOrders);

  // User 
  app.delete("/api/users/:id", verifyToken, verifyIsAdmin, deleteUser);
  app.post("/api/sellers", verifyToken, verifyIsAdmin, postSeller); 
  app.get("/api/sellers", getSellers);
  app.get("/api/users/:id", getUser);
  app.get("/api/users", verifyToken, verifyIsAdmin, getBuyersAndSellers);
  app.post("/api/register", register);
  app.post("/api/login", login);
  app.post("/api/logout", verifyToken, logout);

  // Reviews
  app.post("/api/items/:id/reviews",verifyToken, postReview);
  app.get("/api/items/:id/reviews", getReviews);
  app.get("/api/items/:id/reviews/:reviewId", getReview);
  app.delete("/api/items/:id/reviews/:reviewId", verifyToken, deleteReview);
  app.patch("/api/items/:id/reviews/:reviewId", verifyToken, editReview);


  app.use((_req, res) => sendFailResponse(res, 404));

  server = app.listen(port, () => console.log(`Running on port ${port}`));
};

export const closeServer = async (): Promise<void> => {
  await closeConnection();
  server.close();
  app = null;
};
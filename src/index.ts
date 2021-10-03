import express from "express";
import { getAllItems, getFiltratedItems, getItem } from "./controllers/item";
import { getAllItemsInChart, addItemToChart } from "./controllers/chart";
import { makeAnOrder } from "./controllers/order";
import { addItem, editItem, changeOrderState } from "./controllers/seller";

const server = express();
const port = 5000;

// Item
server.get("/api/items", getAllItems);
server.get("/api/items/:id", getItem);
server.get("/api/items/:color", getFiltratedItems);

// Chart
server.get("/api/chart", getAllItemsInChart);
server.post("/api/chart-add/:id", addItemToChart);

// Order
server.post("/api/make-order", makeAnOrder);

// Seller
server.post("/api/add-item", addItem);
server.patch("/api/edit-item/:id", editItem);
server.patch("/api/change-order-state/:id", changeOrderState);

server.listen(port, () => console.log(`Running on port ${port}`));
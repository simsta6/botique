import express from "express";
import { getAllItems, getFiltratedItems } from "./item";
import { getAllItemsInChart, addItemToChart } from "./chart";
import { makeAnOrder } from "./order";
import { addItem } from "./seller";

const server = express();
const port = 5000;

// Item
server.get("/api/items", getAllItems);
server.get("/api/items/:color", getFiltratedItems);

// Chart
server.get("/api/chart", getAllItemsInChart);
server.post("/api/chart-add/:id", addItemToChart);

// Order
server.post("/api/make-order", makeAnOrder);

// Seller
server.post("/api/add-item", addItem);


server.listen(port, () => console.log(`Running on port ${port}`));
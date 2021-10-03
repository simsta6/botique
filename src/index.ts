import express from "express";
import { getAllItems, getFiltratedItems, getItem } from "./controllers/item";
import { getAllItemsInChart, addItemToChart } from "./controllers/chart";
import { makeAnOrder } from "./controllers/order";
import { addItem, editItem, changeOrderState } from "./controllers/seller";
import { changeUserInfo } from "./controllers/user";

const server = express();
const port = 5000;

// Item
server.get("/api/items", getAllItems); // Perziureti prekes
server.get("/api/items/:id", getItem); // Perziureti preke
server.get("/api/items/:color", getFiltratedItems); // Filtruoti prekes

// Chart
server.get("/api/chart", getAllItemsInChart); // Paziureti krepseli
server.post("/api/chart-add/:id", addItemToChart); //Prideti preke i krepseli

// Order
server.post("/api/make-order", makeAnOrder); // Atlikti uzsakyma

// Seller
server.post("/api/add-item", addItem); // Registruoti produkte
server.patch("/api/edit-item/:id", editItem); // Modifikuoti produkta
server.patch("/api/change-order-state/:id", changeOrderState); // Keisti uzsakymo bukle, patvirtinti uzsakyma, atsaukti uzsakyma

// User
server.patch("/api/change-user", changeUserInfo);

server.listen(port, () => console.log(`Running on port ${port}`));
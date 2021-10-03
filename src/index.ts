import express from "express";
import { getAllItems, getFiltratedItems, getItem } from "./controllers/item";
import { getAllItemsInChart, addItemToChart } from "./controllers/chart";
import { makeAnOrder } from "./controllers/order";
import { addItem, editItem, changeOrderState } from "./controllers/seller";
import { changeUserInfo } from "./controllers/user";
import { addSeller, deleteUser } from "./controllers/admin";

const server = express();
const port = 5000;

// Item
server.get("/api/items", getAllItems); // Perziureti prekes                     ITEM
server.get("/api/items/:id", getItem); // Perziureti preke                      ITEM
server.get("/api/items/:color", getFiltratedItems); // Filtruoti prekes         ITEM

// Chart
server.get("/api/chart", getAllItemsInChart); // Paziureti krepseli             ITEM
server.post("/api/chart-add/:id", addItemToChart); //Prideti preke i krepseli   ITEM

// Order
server.post("/api/make-order", makeAnOrder); // Atlikti uzsakyma                ORDER

// Seller
server.post("/api/add-item", addItem); // Registruoti produkte                            SELLER                    
server.patch("/api/edit-item/:id", editItem); // Modifikuoti produkta                     SELLER
server.patch("/api/change-order-state/:id", changeOrderState); // Keisti uzsakymo bukle,  SELLER


// User
server.patch("/api/change-user", changeUserInfo); //                                      

// Admin
server.patch("/api/add-seller", addSeller); //                                            SELLER
server.patch("/api/delete-user/:id", deleteUser); //                                      

// Item 5 Order 2 Seller 4

server.listen(port, () => console.log(`Running on port ${port}`));
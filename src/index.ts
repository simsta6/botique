import express, { json } from "express";
import { getAllItems, getFiltratedItems, getItem } from "./controllers/item";
import { getAllItemsInChart, addItemToChart } from "./controllers/chart";
import { makeAnOrder } from "./controllers/order";
import { addItem, editItem, changeOrderState, deleteItem, addShop } from "./controllers/seller";
import { changeUserInfo } from "./controllers/user";
import { addSeller, deleteUser } from "./controllers/admin";
import { addReview, deleteReview, editReview, getReview, getReviews, getItemRating } from "./controllers/review";

const server = express();
server.use(json());
const port = 5000;

// Item
server.get("/api/items", getAllItems); // Perziureti prekes                     ITEM
server.get("/api/items/:id", getItem); // Perziureti preke                      ITEM
server.get("/api/items/:color", getFiltratedItems); // Filtruoti prekes         ITEM

// Chart
server.get("/api/charts", getAllItemsInChart); // Paziureti krepseli             ITEM
server.post("/api/charts/:id", addItemToChart); //Prideti preke i krepseli   ITEM

// Order
server.post("/api/orders", makeAnOrder); // Atlikti uzsakyma                ORDER

// Seller
server.post("/api/items", addItem); // Registruoti produkte                            SELLER                    
server.patch("/api/items/:id", editItem); // Modifikuoti produkta                     SELLER
server.patch("/api/orders/:id", changeOrderState); // Keisti uzsakymo bukle,    SELLER
server.delete("/api/items/:id", deleteItem); //                                     SELLER
server.post("/api/shops", addShop); //                                                 SELLER

// User
server.patch("/api/users/:id", changeUserInfo); //                                      

// Admin
server.post("/api/sellers", addSeller); //                                            SELLER
server.delete("/api/users/:id", deleteUser); //           

// Reviews
server.post("/api/reviews", addReview); //                                            REVIEW
server.delete("/api/reviews/:id", deleteReview); //                                REVIEW  
server.patch("/api/reviews/:id", editReview); //                                     REVIEW
server.get("/api/reviews/:id", getReview); //       
server.get("/api/reviews", getReviews); //                                  REVIEW
server.get("/api/items/:id/reviews", getItemRating); //                                REVIEW

server.listen(port, () => console.log(`Running on port ${port}`));
import express from "express";
import { getAllItems } from "./items";

const server = express();
const port = 5000;

server.get("/api/items", getAllItems);

server.listen(port, () => console.log(`Running on port ${port}`));
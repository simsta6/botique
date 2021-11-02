import mongoose from "mongoose";
import { mongoDBUri } from "../connectionUri";

export const connect = (): void => {
  // Connecting to the database
  mongoose
    .connect(mongoDBUri)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};
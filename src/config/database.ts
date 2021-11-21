import mongoose from "mongoose";
import { Mockgoose } from "mockgoose";

export const connect = (): Promise<void> => {
  return new Promise ((resolve, reject) => {
    if (process.env.NODE_ENV === "test") {
      const mockgoose = new Mockgoose(mongoose);

      return mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(process.env.MONGO_URI)
            .then(() => {
              console.log("Successfully connected to database");
              resolve();
            })
            .catch((error) => {
              console.log("Database connection failed. exiting now...");
              console.error(error);
              reject();
              process.exit(1);
            });
        });
    } else {
      return mongoose.connect(process.env.MONGO_URI)
        .then(() => {
          console.log("Successfully connected to database");
          resolve();
        })
        .catch((error) => {
          console.log("Database connection failed. exiting now...");
          console.error(error);
          reject();
          process.exit(1);
        });
    }
  });
};

export const closeConnection = (): Promise<void> => mongoose.disconnect();
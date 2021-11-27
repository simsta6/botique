"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeConnection = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mockgoose_1 = require("mockgoose");
const connect = () => {
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === "test") {
            const mockgoose = new mockgoose_1.Mockgoose(mongoose_1.default);
            return mockgoose.prepareStorage()
                .then(() => {
                mongoose_1.default.connect(process.env.MONGO_URI)
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
        }
        else {
            return mongoose_1.default.connect(process.env.MONGO_URI)
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
exports.connect = connect;
const closeConnection = () => mongoose_1.default.disconnect();
exports.closeConnection = closeConnection;
//# sourceMappingURL=database.js.map
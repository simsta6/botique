"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.mongoDBUri = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoDBUri = "mongodb+srv://admin:admin@cluster0.bmoxo.mongodb.net/botique?retryWrites=true&w=majority";
const connect = () => {
    // Connecting to the database
    mongoose_1.default
        .connect(exports.mongoDBUri)
        .then(() => {
        console.log("Successfully connected to database");
    })
        .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    });
};
exports.connect = connect;
//# sourceMappingURL=connections.js.map
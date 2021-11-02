"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connect = () => {
    mongoose_1.default.connect(process.env.MONGO_URI)
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
//# sourceMappingURL=database.js.map
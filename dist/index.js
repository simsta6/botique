"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwrt = void 0;
const jwt_redis_1 = __importDefault(require("jwt-redis"));
const redis_1 = __importDefault(require("redis"));
const serverStart_1 = require("./serverStart");
const redisClient = redis_1.default.createClient({
    host: process.env.REDIS_HOSTNAME,
    port: +process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});
redisClient.on("error", function (error) {
    console.error(error);
});
exports.jwrt = new jwt_redis_1.default(redisClient);
const args = process.argv.slice(2);
args.length ? (0, serverStart_1.starTestServer)() : (0, serverStart_1.startServer)();
//# sourceMappingURL=index.js.map
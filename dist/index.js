"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initStart = exports.jwrt = void 0;
const dotenv_1 = require("dotenv");
const jwt_redis_1 = __importDefault(require("jwt-redis"));
const redis_1 = __importDefault(require("redis"));
const serverStart_1 = require("./serverStart");
const redis_mock_1 = __importDefault(require("redis-mock"));
(0, dotenv_1.config)();
const redisClient = process.env.NODE_ENV === "test" ? redis_mock_1.default.createClient() : redis_1.default.createClient({
    host: process.env.REDIS_HOSTNAME,
    port: +process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});
redisClient.on("error", function (error) {
    console.error(error);
});
exports.jwrt = new jwt_redis_1.default(redisClient);
const initStart = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, serverStart_1.startServer)();
});
exports.initStart = initStart;
process.env.NODE_ENV !== "test" && (0, exports.initStart)();
//# sourceMappingURL=index.js.map
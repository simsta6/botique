import { config } from "dotenv";
import JWTRedis from "jwt-redis";
import realRedis from "redis";
import { startServer } from "./serverStart";
import redisMock from "redis-mock";

config();

const redisClient = process.env.NODE_ENV === "test" ? redisMock.createClient() : realRedis.createClient({
  host: process.env.REDIS_HOSTNAME,
  port: +process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});

redisClient.on("error", function(error) {
  console.error(error);
});

export const jwrt = new JWTRedis(redisClient);

export const initStart = async (): Promise<void> => {  
  await startServer();
};

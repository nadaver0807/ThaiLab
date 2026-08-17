import dotenv from "dotenv";
import express from "express";
dotenv.config();
import { createApp } from "./app";
import { logger } from "./util/logger";
import { connectToDb } from "./config/db/db.config";

const createServer = async () => {
  const app = express();
  const port = process.env.APP_PORT;
  await createApp(app);
  await connectToDb();

  app.listen(port, () =>
    logger.info(`app listening on port ${port}`, { port: port ?? 0 }),
  );
};

createServer();

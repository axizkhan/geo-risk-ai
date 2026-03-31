import app from "./app";
import { env } from "@repo/shared";
import { mongoConnection } from "@repo/db";

const bootStrap = () => {
  mongoConnection();
  app.listen(env.SERVER_PORT, () => {
    console.log(`server is listening at port ${env.SERVER_PORT}`);
  });
};

bootStrap();

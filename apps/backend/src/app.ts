import express from "express";
import indexRouter from "./routes";

const app = express();

/**middleware for all route */

app.use(express.json());

/**routes */
app.use(indexRouter);

/**repose sending middleware */

/**error handling middleware*/

/**export app */
export default app;

/**main db connection */
export { mongoConnection } from "./client/db.js";

/**user queries */
export * from "./queries/user.queries.js";

/**verify queries */
export * from "./queries/verify.queries.js";

/**provider queries */
export * from "./queries/provider.queries.js";

/**apiKey queries */
export * from "./queries/apiKey.queries.js";

/**message queries */
export * from "./queries/message.queries.js";

/**delievery queries */
export * from "./queries/delievery.queries.js";

export * from "./types/delievry.types.js";

export * from "./types/message.types.js";

/**all dashboard Queries*/
export * from "./queries/dashboard/index.js";

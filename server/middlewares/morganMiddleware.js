import morgan from "morgan";
import logger from "../libs/logger.js";

const morganFormat =
  ":method :url :status :response-time ms - :res[content-length]";

const stream = {
  write: (message) => logger.info(message.trim()),
};

const morganMiddleware = morgan(morganFormat, {
  stream,
  skip: () => process.env.NODE_ENV === "test",
});

export default morganMiddleware;

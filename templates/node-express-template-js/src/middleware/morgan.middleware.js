import morgan from "morgan";
import logger from "../utils/logger.js";

const stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

const morganLogger = morgan("combined", { stream });

export default morganLogger;

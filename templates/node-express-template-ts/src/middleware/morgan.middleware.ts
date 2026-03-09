import morgan from "morgan";
import logger from "../utils/logger.js";

const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

const morganLogger = morgan("combined", { stream });

export default morganLogger;

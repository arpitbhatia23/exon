import morgan from "morgan";
import logger from "../utils/logger.js";

const getColor = (status: number) => {
  if (status >= 500) return "\x1b[31m"; // red
  if (status >= 400) return "\x1b[33m"; // yellow
  if (status >= 300) return "\x1b[36m"; // cyan
  return "\x1b[32m"; // green
};

const stream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

morgan.token("colored-status", (req, res) => {
  const status = res.statusCode;
  const color = getColor(status);
  return `${color}${status}\x1b[0m`;
});

const morganFormat = ":method :url :colored-status :response-time ms";

const morganLogger = morgan(morganFormat, { stream });

export default morganLogger;

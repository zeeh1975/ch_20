import path from "path";
import winston from "winston";
const { align, combine, printf, timestamp, colorize } = winston.format;

const LOG_FORMAT = combine(
  timestamp({ format: "YYYY-MM-DDTHH:mm:ss.sss" }),
  printf(({ level, message, timestamp, label }) => {
    return `${timestamp} ${level.toUpperCase()} ${message}`;
  }),
  colorize()
);

// Silly, Debug, Verbose, Info, Warn, Error.
const logger = winston.createLogger({
  level: "silly",
  format: LOG_FORMAT,
  transports: [
    new winston.transports.Console({
      level: "info",
    }),
    new winston.transports.File({
      filename: path.join(process.env.PWD, "./logs/warn.log"),
      level: "warn",
    }),
    new winston.transports.File({
      filename: path.join(process.env.PWD, "./logs/error.log"),
      level: "error",
    }),
  ],
});

export default logger;


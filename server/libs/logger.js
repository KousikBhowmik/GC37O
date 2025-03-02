import { createLogger, transports, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message, stack }) =>
    stack
      ? `${timestamp} [${level.toUpperCase()}] ${message} - ${stack}`
      : `${timestamp} [${level.toUpperCase()}] ${message}`
  )
);

const logger = createLogger({
  level: "info",
  format: logFormat,
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: "logs/app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
      zippedArchive: true,
    }),
  ],
  exceptionHandlers: [new transports.File({ filename: "logs/exceptions.log" })],
  rejectionHandlers: [new transports.File({ filename: "logs/rejections.log" })],
});

export default logger;

const { createLogger, format, transports } = require('winston');

// Define log format
const logFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create a logger
const logger = createLogger({
  level: 'info', // Set log level (options: 'error', 'warn', 'info', 'verbose', 'debug', 'silly')
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    // Output logs to the console
    new transports.Console(),
    new transports.File({ filename: 'app.log' }),

  ],
});

module.exports = logger;

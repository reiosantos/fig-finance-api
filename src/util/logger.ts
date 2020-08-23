import winston from 'winston';
import path from "path";
import morgan from "morgan";

const logger: winston.Logger = winston.createLogger({
  exitOnError: false,
  handleExceptions: true,
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: winston.format.simple()
    })
  ],
});

const stream = {
  write: function(message: any){
    logger.debug(message);
  }
};

if (global.env !== 'local' && global.env !== 'test') {
  logger.add(new winston.transports.File({
    level: 'info',
    dirname: path.join(__dirname, '../logs'),
    filename: path.join(__dirname, '../logs/morgan-logs.log'),
    handleExceptions: true,
    format: winston.format.json(),
    maxsize: 5242880, //5MB
    maxFiles: 5
  }));
}

const morgan_logger = morgan('combined', {
  skip: (req, res) => res.statusCode < 400,
  stream: stream
});

export { morgan_logger }
export default logger;

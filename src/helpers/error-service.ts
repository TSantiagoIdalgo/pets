import { Request, Response, NextFunction } from 'express';
import { ErrorTypes } from '#src/types/errors.type';
import ErrorHandler from '#src/helpers/error-handler';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    //new winston.transports.Console({ level: 'error' })
  ],
});

// Middleware que se encarga de guardar un error en un archivo .log
export default class ErrorService {
  ErrorSave(error: unknown, _req: Request, res: Response, next: NextFunction) {
    if (error instanceof ErrorHandler) {
      // "at" se refiere al archivo donde se genero este error
      const at = error.stack?.split('\n')[1].trim();
      logger.error({ message: error.message, reason: error.data, at });
      res.status(error.code).json({ [error.code]: error.message });
      next();
    } else if (error instanceof Error) {
      const at = error.stack?.split('\n')[1].trim();
      logger.error({ at, message: error.message });
      res.status(500).json({ message: error.message });
      next();
    } else {
      logger.error({ message: ErrorTypes.INTERNAL_ERROR });
      res.status(500).json({ message: ErrorTypes.INTERNAL_ERROR });
      next();
    }
  }
}

import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from 'src/common/logger.service';

@Injectable()
export class ErrorHandlerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {} // Inject the logger service

  use(req: Request, res: Response, next: NextFunction) {
    try {
      // Execute the next middleware
      next();
    } catch (error) {
      const status =
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      const message = error.message || 'Internal Server Error';

      // Log the error using the logger service
      this.logger.error(message, error.stack);

      res.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: req.url,
        message: message,
      });
    }
  }
}

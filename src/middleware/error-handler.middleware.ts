import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from 'src/common/logger.service';

@Injectable()
export class ErrorHandlerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {} // Inject the logger service

  use(req: Request, res: Response, next: NextFunction) {
    // Your middleware logic
    // You can handle errors or perform other actions here

    // If you want to handle errors, you can add code like this:
    try {
      // Execute the next middleware or route handler
      next();
    } catch (error) {
      // Handle the error
      const status =
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      const message = error.message || 'Internal Server Error';

      // Log the error using the logger service
      this.logger.error(message, error.stack);

      // Send a response with the error information
      res.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: req.url,
        message: message,
      });
    }
  }
}

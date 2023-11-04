import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from 'src/shared/logger.service';


@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) { }

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url, ip } = req;

    // Record the start time of the request processing
    const startTime = new Date().getTime();

    // Move to the next middleware in the pipeline
    next();

    // After the response is sent, calculate the time taken and log it along with the status code
    res.on('finish', () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      const statusCode = res.statusCode; // Get the HTTP status code

      if (statusCode >= 200 && statusCode < 400) {
        // HTTP status code indicates success
        this.logger.info(`Request to ${method} ${url} took ${duration} ms - Status: ${statusCode}`);
      }
    });
  }
}
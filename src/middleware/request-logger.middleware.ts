import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const end = Date.now();
      const elapsed = end - start;
      this.logger.log(
        `Request to ${req.method} ${req.url} completed in ${elapsed}ms`
      );
    });
    next();
  }
}

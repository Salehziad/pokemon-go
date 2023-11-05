import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../shared/logger.service';


@Injectable()
export class ErrorHandlerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) { }
  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let newExeption = exception;
    if (exception && exception?.response?.message) {
      console.log(2);
      
      newExeption = exception?.response?.message;
    }
    else if (exception && exception.message) {
      console.log(3);
      
      newExeption = exception.message;
    }

    this.logger.error(
      `route ${request.url} faild with status error ${status} because ${newExeption}`,
    );


    response.status(status).json({
      statusCode: status,
      message: newExeption,
      route: request.url,
    });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
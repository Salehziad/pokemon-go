import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { ErrorHandlerMiddleware } from './middleware/error-handler.middleware';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { LoggerService } from './shared/logger.service';
import { SharedModule } from './shared/shared.module';
import * as cookieParser from 'cookie-parser';

@Module({
  imports: [UserModule, AuthModule, PokemonModule, SharedModule],
  providers: [
    LoggerService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware, ErrorHandlerMiddleware).forRoutes('*');
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
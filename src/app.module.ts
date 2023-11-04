import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { ErrorHandlerMiddleware } from './middleware/error-handler.middleware';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { LoggerService } from './shared/logger.service';

@Module({
  imports: [UserModule, AuthModule, PokemonModule],
  providers: [
    LoggerService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware, ErrorHandlerMiddleware).forRoutes('*');
  }
}
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { ErrorHandlerMiddleware } from './middleware/error-handler.middleware';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { LoggerService } from './common/logger.service';

@Module({
  imports: [UserModule, AuthModule, PokemonModule, CommonModule],
  providers: [
    LoggerService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*'); // Add other middleware if needed
    consumer.apply(ErrorHandlerMiddleware).forRoutes('*'); // Add other middleware if needed
  }
}
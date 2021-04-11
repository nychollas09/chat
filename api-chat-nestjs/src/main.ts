import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { RefreshTokenPreProcessorInterceptor } from './auth/interceptor/refresh-token-pre-processor.interceptor';
import { AllExceptionHandlerFilter } from './exception-handler/all-exception-handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionHandlerFilter());
  app.useGlobalInterceptors(new RefreshTokenPreProcessorInterceptor());
  app.use(cookieParser());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

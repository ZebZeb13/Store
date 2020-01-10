import * as dotenv from 'dotenv';

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
  case 'test':
    path = `${__dirname}/../.env.test`;
    break;
  case 'production':
    path = `${__dirname}/../.env.production`;
    break;
  default:
    path = `${__dirname}/../.env.development`;
}
dotenv.config({ path });



import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { NestJsLogger } from './common/logger/nestJs.logger';
import { HttpExceptionFilter } from './common/filter/http-exception.filer';
import { LoggingInterceptor } from './common/logger/interceptor/logging.interceptor';
import { CustomLogger } from './common/logger/logger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(/*{logger: true}*/),
  );
  // app.useLogger(app.get(Logger));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3001/*process.env.PORT*/, '0.0.0.0');
}
bootstrap();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GraphQLModule } from '@nestjs/graphql';

import { ObjectItem } from './module/object/entities/item.entity';
import { ObjectModule } from './module/object/object.module';
import { ObjectTemplate } from './module/object/entities/template.entity';

import { StringTemplate } from './module/string/entities/template.entity';
import { StringTemplateLinker } from './module/string/entities/templateLinker.entity';
import { StringLinker } from './module/string/entities/linker.entity';

import { IntTemplate } from './module/int/entities/template.entity';
import { IntTemplateLinker } from './module/int/entities/templateLinker.entity';
import { IntLinker } from './module/int/entities/linker.entity';
import { IntUnity } from './module/int/entities/unity.entity';

import { Category } from './module/category/entities/category.entity';
import { CategoryModule } from './module/category/category.module';
import { StringModule } from './module/string/string.module';
import { IntModule } from './module/int/int.module';
import { UserModule } from './module/user/user.module';
import { User } from './module/user/entities/user.entity';
import { AuthModule } from './module/auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { TypeOrmLogger } from './common/logger/typeOrm.logger';
import { LoggerModule } from './common/logger/logger.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: './src/schema.graphql',
      debug: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        User,
        ObjectItem,
        ObjectTemplate,
        Category,
        StringTemplate,
        StringTemplateLinker,
        StringLinker,
        IntTemplate,
        IntTemplateLinker,
        IntLinker,
        IntUnity,
      ],
      synchronize: true,
      dropSchema: false,
      maxQueryExecutionTime: 1000,
      logging: ['error', 'warn', 'schema', 'migration'],
      // logging: true,
      logger: new TypeOrmLogger(),
      // "entities": ["entity/*.js"],
      migrations: ['migration/*.js'],
      cli: {
          migrationsDir: 'migration',
      },
    }),
    LoggerModule,
    AuthModule,
    UserModule,
    AuthModule,
    ObjectModule,
    CategoryModule,
    StringModule,
    IntModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule { }

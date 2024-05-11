import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import {
  HttpException,
  HttpStatus,
  LogLevel,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { join } from 'path';
import * as compression from 'compression';
import { config } from 'dotenv';
config();

import { AppModule } from './app.module';
import { ExceptionResponseDetail } from './utils/utils.exception.common/utils.exception.common';
import { KafkaGroupIdEnum } from './utils/utils.enums/kafka-group-id-enum';
import { LIGHTNOVEL_GRPC_PACKAGE_NAME } from './protos/lightnovel/lightnovel';

async function bootstrap(): Promise<void> {
  process.env.TZ = 'Asia/Ho_Chi_Minh';

  const app = await NestFactory.create(AppModule, {
    logger: process.env.CONFIG_LOGGER_LEVEL.split(',').filter(
      (level: string): level is LogLevel => {
        return ['log', 'error', 'warn', 'debug', 'verbose'].includes(
          level as LogLevel,
        );
      },
    ),
  });

  //Kafka config
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [
          `${process.env.CONFIG_KAFKA_HOST}:${process.env.CONFIG_KAFKA_PORT}`,
        ],
      },
      consumer: {
        groupId: KafkaGroupIdEnum.LIGHTNOVEL_SERVICE,
      },
      producer: {
        createPartitioner: Partitioners.LegacyPartitioner,
      },
    },
  });

  //gRPC config
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: LIGHTNOVEL_GRPC_PACKAGE_NAME,
      protoPath: join(__dirname, 'protos/lightnovel/lightnovel.proto'),
      url: `${process.env.CONFIG_GRPC_HOST}:${process.env.CONFIG_GRPC_PORT}`,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []): void => {
        throw new HttpException(
          new ExceptionResponseDetail(
            HttpStatus.BAD_REQUEST,
            Object.values(validationErrors[0].constraints)[0],
          ),
          HttpStatus.OK,
        );
      },
    }),
  );

  app.use(
    compression({
      level: 6,
      threshold: 100 * 1000,
    }),
  );

  app.startAllMicroservices();

  await app.listen(process.env.SERVICE_PORT, '0.0.0.0');

  console.log(`Application is run ${await app.getUrl()}`);

  console.log(`
      ============================.ENV=======================

      SERVICE_PORT: ${process.env.SERVICE_PORT},
      CONFIG_KAFKA_HOST: ${process.env.CONFIG_KAFKA_HOST},
      CONFIG_KAFKA_PORT: ${process.env.CONFIG_KAFKA_PORT},
    `);
}
bootstrap();

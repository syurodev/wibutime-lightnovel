import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigGRPCNameEnum } from 'src/common/enums/config-grpc-name-enum.common';
import { AUTH_SERVICE_GRPC_PACKAGE_PACKAGE_NAME } from './proto/auth/auth';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: ConfigGRPCNameEnum.AUTH,
        transport: Transport.GRPC,
        options: {
          package: AUTH_SERVICE_GRPC_PACKAGE_PACKAGE_NAME,
          protoPath: join(__dirname, '/proto/auth/auth.proto'),
          url: `${process.env.CONFIG_AUTH_SERVICE_GRPC_HOST}:${process.env.CONFIG_AUTH_SERVICE_GRPC_PORT}`,
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class GrpcModule {}

// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.174.0
//   protoc               v5.26.1
// source: src/grpc/proto/test/auth.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'AUTH_SERVICE_GRPC_PACKAGE';

export interface FullTokenResponse {
  access_token: string;
  expires_in: string;
  refresh_token: string;
}

export interface UserDataResponse {
  id: number;
  name: string;
  email: string;
  image: string;
  email_verified: boolean;
  coins: number;
  provider: string;
  username?: string | undefined;
  password?: string | undefined;
  backend_token?: FullTokenResponse | undefined;
  roles: string[];
  permissions: string[];
}

export interface VerificationJwtTokenRequest {
  access_token: string;
}

export interface VerificationJwtTokenResponse {
  status: number;
  message: string;
  data: UserDataResponse | undefined;
}

export const AUTH_SERVICE_GRPC_PACKAGE_PACKAGE_NAME =
  'AUTH_SERVICE_GRPC_PACKAGE';

export interface AuthGRPCServiceClient {
  verificationJwtToken(
    request: VerificationJwtTokenRequest,
  ): Observable<VerificationJwtTokenResponse>;
}

export interface AuthGRPCServiceController {
  verificationJwtToken(
    request: VerificationJwtTokenRequest,
  ):
    | Promise<VerificationJwtTokenResponse>
    | Observable<VerificationJwtTokenResponse>
    | VerificationJwtTokenResponse;
}

export function AuthGRPCServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['verificationJwtToken'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('AuthGRPCService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('AuthGRPCService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const AUTH_GRPC_SERVICE_NAME = 'AuthGRPCService';
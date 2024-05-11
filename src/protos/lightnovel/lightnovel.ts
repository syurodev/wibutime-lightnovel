/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'lightnovelgrpc';

export interface GetLightnovelsRequest {
  page?: number | undefined;
  skip?: number | undefined;
}

export interface GetLightnovelDetailDTO {
  urlId: string;
}

export interface Image {
  key: string;
  url: string;
}

export interface Category {
  name: string;
}

export interface LightnovelData {
  id: string;
  url_id: string;
  name: string;
  categories: Category[];
  image: Image | undefined;
  status: string;
  created_at: number;
}

export interface LightnovelDetailData {
  id: string;
  url_id: string;
  name: string;
  other_names: string[];
  author: string;
  artist: string;
  image: Image | undefined;
  categories: Category[];
  summary: string;
  deleted: boolean;
  status: string;
  note: string;
  user_id: number;
  created_at: number;
  updated_at: number;
}

export interface ErrorResponse {
  message: string;
}

export interface LightnovelDetailGRPCResponse {
  error: ErrorResponse | null;
  success: LightnovelDetailData | null;
}

export interface LightnovelsGRPCResponse {
  error: ErrorResponse | undefined;
  success: LightnovelData[];
}

export const LIGHTNOVEL_GRPC_PACKAGE_NAME = 'lightnovelgrpc';

export interface LightnovelGRPCServiceClient {
  getLightnovelDetail(
    request: GetLightnovelDetailDTO,
  ): Observable<LightnovelDetailGRPCResponse>;

  getLightnovels(
    request: GetLightnovelsRequest,
  ): Observable<LightnovelsGRPCResponse>;
}

export interface LightnovelGRPCServiceController {
  getLightnovelDetail(
    request: GetLightnovelDetailDTO,
  ):
    | Promise<LightnovelDetailGRPCResponse>
    | Observable<LightnovelDetailGRPCResponse>
    | LightnovelDetailGRPCResponse;

  getLightnovels(
    request: GetLightnovelsRequest,
  ):
    | Promise<LightnovelsGRPCResponse>
    | Observable<LightnovelsGRPCResponse>
    | LightnovelsGRPCResponse;
}

export function LightnovelGRPCServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['getLightnovelDetail', 'getLightnovels'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('LightnovelGRPCService', method)(
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
      GrpcStreamMethod('LightnovelGRPCService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const LIGHTNOVEL_GRPC_SERVICE_NAME = 'LightnovelGRPCService';

import { Controller, HttpStatus } from '@nestjs/common';

import { LightnovelService } from './lightnovel.service';
import {
  CreateLightnovelRequest,
  GetLightnovelDetailDTO,
  GetLightnovelsRequest,
  LightnovelDetailResponse,
  LightnovelGRPCServiceController,
  LightnovelGRPCServiceControllerMethods,
} from 'src/proto/lightnovel/lightnovel';
import { BaseResponseData } from 'src/common/response/base.response.common';
import { LIGHTNOVEL_MESSAGE_RESPONSE } from 'src/common/enums/lightnovel-message-response.enum';
import { Metadata } from '@grpc/grpc-js';
import { getTokenFromGrpcMetadata } from 'src/common/grpc/get-token-from-grpc-metadata';

@Controller()
@LightnovelGRPCServiceControllerMethods()
export class LightnovelController implements LightnovelGRPCServiceController {
  constructor(private readonly lightnovelService: LightnovelService) {}

  async createLightnovel(
    request: CreateLightnovelRequest,
    metadata: Metadata,
  ): Promise<LightnovelDetailResponse> {
    const response: BaseResponseData = new BaseResponseData();

    const result = await this.lightnovelService.createLightnovel(
      request,
      getTokenFromGrpcMetadata(metadata),
    );

    if (typeof result === 'string') {
      response.setMessage(HttpStatus.BAD_REQUEST, result);
      return response;
    }

    response.setData(result);
    return response;
  }

  async getLightnovelDetail(
    request: GetLightnovelDetailDTO,
  ): Promise<LightnovelDetailResponse> {
    const response: BaseResponseData = new BaseResponseData();

    const result = await this.lightnovelService.getLightnovelDetail(
      request.url_id,
    );

    if (!result) {
      response.setMessage(
        HttpStatus.NOT_FOUND,
        LIGHTNOVEL_MESSAGE_RESPONSE.LIGHTNOVEL_NOT_FOUND,
      );
    }

    response.setData(result);
    return response;
  }

  async getLightnovels(request: GetLightnovelsRequest) {
    const response: BaseResponseData = new BaseResponseData();
    const result = await this.lightnovelService.getLightnovels({
      limit: request.skip,
      page: request.page,
    });

    if (!result) {
      response.setMessage(
        HttpStatus.NOT_FOUND,
        LIGHTNOVEL_MESSAGE_RESPONSE.LIGHTNOVEL_NOT_FOUND,
      );
      return response;
    }

    response.setData(result);
    return response;
  }
}

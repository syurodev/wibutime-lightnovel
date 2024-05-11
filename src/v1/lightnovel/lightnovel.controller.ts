import { Controller } from '@nestjs/common';
import { KafkaTopicEnum } from 'src/utils/utils.enums/kafka-topic-enum';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { LightnovelService } from './lightnovel.service';
import { ResponseData } from 'src/utils/utils.response.common/utils.response.common';
import {
  GetLightnovelDetailDTO,
  GetLightnovelsRequest,
  LightnovelData,
  LightnovelDetailData,
  LightnovelDetailGRPCResponse,
  LightnovelGRPCServiceController,
  LightnovelGRPCServiceControllerMethods,
} from 'src/protos/lightnovel/lightnovel';
import { Lightnovel } from './lightnovel.schema/lightnovel.schema';

@Controller()
@LightnovelGRPCServiceControllerMethods()
export class LightnovelController implements LightnovelGRPCServiceController {
  constructor(private readonly lightnovelService: LightnovelService) {}

  @MessagePattern(KafkaTopicEnum.CREATE_LIGHTNOVEL)
  async handleCreateLightnovel(@Payload() data: any): Promise<any> {
    const response = new ResponseData<Lightnovel>();
    response.autoGenerateResponse(
      await this.lightnovelService.createLightnovel(data),
      'Tạo lightnovel không thành công',
    );
    return JSON.stringify(response);
  }

  @MessagePattern(KafkaTopicEnum.GET_LIGHTNOVELS)
  async handleGetLightnovels(
    @Payload() data: { limit: number; page: number },
  ): Promise<any> {
    return await this.lightnovelService.getLightnovels(data);
  }

  async getLightnovelDetail(
    data: GetLightnovelDetailDTO,
  ): Promise<LightnovelDetailGRPCResponse> {
    const response = new ResponseData<LightnovelDetailData>();

    const result = await this.lightnovelService.getLightnovelDetail(data.urlId);

    response.autoGenerateResponse(result, 'Không tìm thấy lightnovel');

    return response;
  }

  async getLightnovels(request: GetLightnovelsRequest) {
    const response = new ResponseData<LightnovelData[]>();

    const result = await this.lightnovelService.getLightnovels({
      limit: request.skip,
      page: request.page,
    });
    console.log(result);

    response.autoGenerateResponse(result);
    return response;
  }
}

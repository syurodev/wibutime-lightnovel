import {
  HttpStatus,
  Inject,
  Injectable,
  ValidationError,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { validate } from 'class-validator';
import { Model } from 'mongoose';

import { LightnovelCreateDto } from './lightnovel.dto/lightnovel-create.dto';
import { Lightnovel } from './lightnovel.schema/lightnovel.schema';
import {
  CreateLightnovelRequest,
  LightnovelData,
  LightnovelDetailData,
} from 'src/proto/lightnovel/lightnovel';
import { GenerateCode } from 'src/common/generate/generate-code.common';
import { LIGHTNOVEL_MESSAGE_RESPONSE } from 'src/common/enums/lightnovel-message-response.enum';
import { ConfigGRPCNameEnum } from 'src/common/enums/config-grpc-name-enum.common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  AUTH_GRPC_SERVICE_NAME,
  AuthGRPCServiceClient,
  VerificationJwtTokenResponse,
} from '../grpc/proto/auth/auth';
import { lastValueFrom } from 'rxjs';
import { UserRoleEnum } from 'src/common/enums/user-roles.enums';
import { UserPermissionsEnum } from 'src/common/enums/user-permissions.enums';

@Injectable()
export class LightnovelService {
  private gRPCAuthService: AuthGRPCServiceClient;

  constructor(
    @Inject(ConfigGRPCNameEnum.AUTH)
    private readonly gRPCClient: ClientGrpc,
  ) {}

  async onModuleInit() {
    //gRPC
    this.gRPCAuthService = this.gRPCClient.getService<AuthGRPCServiceClient>(
      AUTH_GRPC_SERVICE_NAME,
    );
  }

  @InjectModel(Lightnovel.name) private lightnovelModel: Model<Lightnovel>;

  async createLightnovel(
    data: CreateLightnovelRequest,
    access_token: string,
  ): Promise<Lightnovel | string> {
    const validationErrors: ValidationError[] = await validate(
      Object.assign(new LightnovelCreateDto(), data),
    );

    if (validationErrors.length > 0) {
      return `${validationErrors[0].property} không hợp lệ!`;
    }

    const user: VerificationJwtTokenResponse = await lastValueFrom(
      await this.gRPCAuthService.verificationJwtToken({
        access_token: access_token,
      }),
    );

    if (user.status !== HttpStatus.OK) {
      return user.message;
    }

    data.url_id = GenerateCode.generateId(user.data.id, data.name);

    if (
      !user.data.roles.includes(UserRoleEnum.CREATER) &&
      !user.data.permissions.includes(UserPermissionsEnum.UPLOAD)
    ) {
      return LIGHTNOVEL_MESSAGE_RESPONSE.USER_INSUFFICIENT_AUTHORITY;
    }

    data.user_id = user.data.id;

    const createdLightnovel: Lightnovel = await this.lightnovelModel.create({
      ...data,
      summary: JSON.parse(data.summary as string),
      note: JSON.parse(data.note as string),
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    });

    return createdLightnovel
      ? createdLightnovel
      : LIGHTNOVEL_MESSAGE_RESPONSE.LIGHTNOVEL_CREATE_ERROR;
  }

  async getLightnovels(slug: {
    limit: number;
    page: number;
  }): Promise<LightnovelData[]> {
    const rawData = await this.lightnovelModel
      .find()
      .where({ deleted: false })
      .select({
        _id: true,
        name: true,
        categories: true,
        image: true,
        status: true,
        urlId: true,
        createdAt: true,
      })
      .limit(slug.limit)
      .skip(slug.limit * (slug.page < 0 ? 0 : slug.page - 1));

    return rawData.map((lightnovel) => ({
      id: lightnovel._id.toString(),
      url_id: lightnovel.urlId,
      name: lightnovel.name,
      categories: lightnovel.categories,
      image: lightnovel.image,
      status: lightnovel.status,
      created_at: lightnovel.createdAt.toString(),
    }));
  }

  async getLightnovelDetail(
    urlId: string,
  ): Promise<LightnovelDetailData | null> {
    const existingLightnovel = await this.lightnovelModel.findOne({
      $and: [{ url_id: urlId }, { deleted: false }],
    });

    return existingLightnovel
      ? {
          id: existingLightnovel._id.toString(),
          url_id: existingLightnovel.urlId,
          name: existingLightnovel.name,
          other_names: existingLightnovel.otherNames,
          author: existingLightnovel.author,
          illustrator: existingLightnovel.illustrator,
          image: existingLightnovel.image,
          categories: existingLightnovel.categories,
          summary: JSON.stringify(existingLightnovel.summary),
          deleted: existingLightnovel.deleted,
          status: existingLightnovel.status,
          note: JSON.stringify(existingLightnovel.note),
          user_id: existingLightnovel.userId,
          created_at: existingLightnovel.createdAt.toString(),
          updated_at: existingLightnovel.updatedAt.toString(),
        }
      : null;
  }
}

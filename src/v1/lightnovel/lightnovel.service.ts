import { Injectable, ValidationError } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { validate } from 'class-validator';
import { Model } from 'mongoose';

import { LightnovelCreateDto } from './lightnovel.dto/lightnovel-create.dto';
import { Lightnovel } from './lightnovel.schema/lightnovel.schema';
import { GenerateId } from 'src/utils/utils.generate.id.common/utils.generate.id.common';
import {
  LightnovelData,
  LightnovelDetailData,
} from 'src/protos/lightnovel/lightnovel';

@Injectable()
export class LightnovelService {
  @InjectModel(Lightnovel.name) private lightnovelModel: Model<Lightnovel>;

  async createLightnovel(
    data: LightnovelCreateDto,
  ): Promise<Lightnovel | null> {
    data.url_id = GenerateId.generateId(data.user_id, data.name);

    const validationErrors: ValidationError[] = await validate(
      Object.assign(new LightnovelCreateDto(), data),
    );

    if (validationErrors.length > 0) {
      return null;
    }

    const createdLightnovel: Lightnovel = await this.lightnovelModel.create({
      ...data,
      created_at: new Date().getTime(),
    });

    return createdLightnovel ? createdLightnovel : null;
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
        url_id: true,
        createdAt: true,
      })
      .limit(slug.limit)
      .skip(slug.limit * (slug.page < 0 ? 0 : slug.page - 1));

    return rawData.map((lightnovel) => ({
      id: lightnovel._id.toString(),
      url_id: lightnovel.url_id,
      name: lightnovel.name,
      categories: lightnovel.categories,
      image: lightnovel.image,
      status: lightnovel.status,
      created_at: lightnovel.created_at,
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
          url_id: existingLightnovel.url_id,
          name: existingLightnovel.name,
          other_names: existingLightnovel.other_names,
          author: existingLightnovel.author,
          artist: existingLightnovel.artist,
          image: existingLightnovel.image,
          categories: existingLightnovel.categories,
          summary: JSON.stringify(existingLightnovel.summary),
          deleted: existingLightnovel.deleted,
          status: existingLightnovel.status,
          note: JSON.stringify(existingLightnovel.note),
          user_id: existingLightnovel.user_id,
          created_at: existingLightnovel.created_at,
          updated_at: existingLightnovel.updated_at,
        }
      : null;
  }
}

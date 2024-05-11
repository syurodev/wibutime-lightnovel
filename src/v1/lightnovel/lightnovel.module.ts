import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LightnovelService } from './lightnovel.service';
import { LightnovelController } from './lightnovel.controller';
import {
  Lightnovel,
  LightnovelSchema,
} from './lightnovel.schema/lightnovel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Lightnovel.name, schema: LightnovelSchema },
    ]),
  ],
  controllers: [LightnovelController],
  providers: [LightnovelService],
})
export class LightnovelModule {}

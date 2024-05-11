import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VolumeService } from './volume.service';
import {
  LightnovelVolume,
  LightnovelVolumeSchema,
} from './volume.schema/volume.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LightnovelVolume.name, schema: LightnovelVolumeSchema },
    ]),
  ],
  providers: [VolumeService],
})
export class VolumeModule {}

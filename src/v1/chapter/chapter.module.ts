import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChapterService } from './chapter.service';
import {
  LightnovelChapter,
  LightnovelChapterSchema,
} from './chapter.schema/chapter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LightnovelChapter.name, schema: LightnovelChapterSchema },
    ]),
  ],
  providers: [ChapterService],
})
export class ChapterModule {}

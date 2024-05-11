import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LightnovelModule } from './v1/lightnovel/lightnovel.module';
import { VolumeModule } from './v1/volume/volume.module';
import { ChapterModule } from './v1/chapter/chapter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.CONFIG_DATABASE_URI),
    LightnovelModule,
    VolumeModule,
    ChapterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

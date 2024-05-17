import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CateroryController } from './caterory.controller';
import { CategoryService } from './caterory.service';
import { Category, CategorySchema } from './category.schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CateroryController],
  providers: [CategoryService],
})
export class CateroryModule {}

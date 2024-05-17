import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category, CategoryDocument } from './category.schema/category.schema';

@Injectable()
export class CategoryService {
  @InjectModel(Category.name) private categoryModel: Model<Category>;

  async getCategories(): Promise<string[]> {
    const result: CategoryDocument[] = await this.categoryModel.find();

    return result.map((category) => category.name);
  }
}

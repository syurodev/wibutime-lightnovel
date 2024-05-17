import { Controller } from '@nestjs/common';

import {
  CategoriesResponse,
  CategoryResponse,
  CreateCategoryRequest,
  DeleteCategoryRequest,
  EmptyResponse,
  GetCategoriesRequest,
  LightnovelCategoryGRPCServiceController,
  LightnovelCategoryGRPCServiceControllerMethods,
  SearchCategoryRequest,
  UpdateCategoryRequest,
} from 'src/proto/category/category';
import { CategoryService } from './caterory.service';
import { BaseResponseData } from 'src/common/response/base.response.common';
import { Metadata } from '@grpc/grpc-js';
import { getTokenFromGrpcMetadata } from 'src/common/grpc/get-token-from-grpc-metadata';

@Controller()
@LightnovelCategoryGRPCServiceControllerMethods()
export class CateroryController
  implements LightnovelCategoryGRPCServiceController
{
  constructor(private readonly categoryService: CategoryService) {}

  async createCategory(
    request: CreateCategoryRequest,
  ): Promise<CategoryResponse> {
    return null;
  }

  async deleteCategory(request: DeleteCategoryRequest): Promise<EmptyResponse> {
    return null;
  }

  async getCategories(
    request: GetCategoriesRequest,
  ): Promise<CategoriesResponse> {
    const response: BaseResponseData = new BaseResponseData();
    response.setData((await this.categoryService.getCategories()) ?? []);
    return response;
  }

  async searchCategory(
    request: SearchCategoryRequest,
  ): Promise<CategoriesResponse> {
    return null;
  }

  async updateCategory(
    request: UpdateCategoryRequest,
  ): Promise<CategoryResponse> {
    return null;
  }
}

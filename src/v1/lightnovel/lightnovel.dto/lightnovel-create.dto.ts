import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ImageDto } from './image.dto';
import { CategoryDto } from './category.dto';

export class LightnovelCreateDto {
  @IsOptional()
  @IsString()
  url_id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  other_names: string[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  categories: CategoryDto[];

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  illustrator?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ImageDto)
  image?: ImageDto;

  @IsNotEmpty()
  @IsObject()
  summary: object;

  @IsOptional()
  @IsObject()
  note?: object;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsOptional()
  @IsNumber()
  translation_group_id?: number;
}

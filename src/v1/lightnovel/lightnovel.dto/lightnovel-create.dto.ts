import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';

export class LightnovelCreateDto {
  @IsOptional()
  @IsString()
  urlId?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  otherNames: string[];

  @IsNotEmpty()
  @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CategoryDto)
  categories: string[];

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  illustrator?: string;

  @IsOptional()
  @IsString()
  // @Type(() => ImageDto)
  image?: string;

  @IsNotEmpty()
  @IsString()
  summary: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNumber()
  translationGroupId?: number;
}

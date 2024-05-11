import { IsString, IsOptional } from 'class-validator';

export class ImageDto {
  @IsOptional()
  @IsString()
  key?: string;

  @IsOptional()
  @IsString()
  url?: string;
}

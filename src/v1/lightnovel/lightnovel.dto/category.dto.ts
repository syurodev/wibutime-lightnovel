import { IsString, IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}

import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class MenuItemLinkDto {
  @IsInt()
  routineId: number;

  @IsOptional()
  @IsInt()
  sortOrder?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CreateMenuDto {
  @IsNotEmpty({ message: 'O título do menu é obrigatório.' })
  @IsString()
  title: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MenuItemLinkDto)
  items?: MenuItemLinkDto[];
}

export class CreateMenuRoutineLinkDto {
  @IsInt()
  menuId: number;

  @IsInt()
  routineId: number;

  @IsOptional()
  @IsInt()
  sortOrder?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

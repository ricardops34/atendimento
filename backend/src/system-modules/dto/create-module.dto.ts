import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateModuleDto {
  @IsNotEmpty({ message: 'O nome do módulo é obrigatório.' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'A key do módulo é obrigatória.' })
  @IsString()
  key: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @IsOptional()
  @IsString()
  icon?: string;
}

import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateRoutineDto {
  @IsInt()
  moduleId: number;

  @IsNotEmpty({ message: 'O nome da rotina é obrigatório.' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'A key da rotina é obrigatória.' })
  @IsString()
  key: string;

  @IsNotEmpty({ message: 'O path da rotina é obrigatório.' })
  @IsString()
  path: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  shortLabel?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

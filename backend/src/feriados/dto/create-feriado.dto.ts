import { IsString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateFeriadoDto {
  @IsNotEmpty()
  data: string | Date;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsBoolean()
  @IsOptional()
  fixo?: boolean;

  @IsString()
  @IsOptional()
  municipio?: string;
}

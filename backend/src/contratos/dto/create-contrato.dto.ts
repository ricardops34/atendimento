import { IsBoolean, IsHexColor, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContratoDto {
  @IsNotEmpty({ message: 'A empresa é obrigatória.' })
  @IsInt()
  empresaId: number;

  @IsNotEmpty({ message: 'A descrição do contrato é obrigatória.' })
  @IsString()
  descricao: string;

  @IsOptional()
  @IsString()
  cor?: string;

  @IsOptional()
  @IsBoolean()
  isFeriado?: boolean;
}

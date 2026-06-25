import {
  IsArray,
  IsBoolean,
  IsHexColor,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class EscalaItemDto {
  @IsInt()
  @Min(0)
  @Max(6)
  diaSemana: number;

  @IsInt()
  profissionalId: number;

  @IsNotEmpty()
  @IsString()
  horaInicio: string;

  @IsNotEmpty()
  @IsString()
  horaFim: string;

  @IsNotEmpty()
  @IsString()
  intervaloIni: string;

  @IsNotEmpty()
  @IsString()
  intervaloFim: string;
}

export class CreateContratoDto {
  @IsNotEmpty({ message: 'O cliente é obrigatório.' })
  @IsInt()
  clienteId: number;

  @IsNotEmpty({ message: 'A descrição do contrato é obrigatória.' })
  @IsString()
  descricao: string;

  @IsOptional()
  @IsHexColor({ message: 'Informe uma cor hexadecimal válida (ex: #4CAF50).' })
  cor?: string;

  @IsNotEmpty({ message: 'Data de início é obrigatória.' })
  @IsString()
  dtInicio: string;

  @IsNotEmpty({ message: 'Data de fim é obrigatória.' })
  @IsString()
  dtFim: string;

  @IsNotEmpty({ message: 'Tipo de contrato é obrigatório.' })
  @IsIn(['F', 'H'], { message: 'Tipo deve ser F (Fixo) ou H (Hora).' })
  tipo: string;

  @IsOptional()
  @IsNumber()
  valorHora?: number;

  @IsOptional()
  @IsNumber()
  valorFixo?: number;

  @IsOptional()
  @IsBoolean()
  isFeriado?: boolean;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  profissionalIds?: number[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EscalaItemDto)
  escalas?: EscalaItemDto[];
}

import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export const REGIMES_TRIBUTARIOS = [
  'MEI',
  'SIMPLES_NACIONAL',
  'LUCRO_PRESUMIDO',
  'LUCRO_REAL',
] as const;

export class UpsertProfissionalFiscalDto {
  @IsOptional()
  @IsString()
  @MaxLength(18)
  cnpj?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  razaoSocial?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  nomeFantasia?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  inscricaoMunicipal?: string;

  @IsOptional()
  @IsIn(REGIMES_TRIBUTARIOS)
  regimeTributario?: (typeof REGIMES_TRIBUTARIOS)[number];

  @IsOptional()
  @IsBoolean()
  optanteSimplesNacional?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  cnae?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  codigoServico?: string;

  @IsOptional()
  @IsNumber()
  aliquotaIss?: number;

  @IsOptional()
  @IsString()
  @MaxLength(8)
  cep?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  logradouro?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  numero?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  complemento?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  bairro?: string;

  @IsOptional()
  @IsInt()
  municipioId?: number;

  @IsOptional()
  @IsInt()
  estadoId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  emailNfse?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefoneNfse?: string;
}

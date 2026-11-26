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

export class ProfissionalHabilitadoDto {
  @IsInt()
  profissionalId: number;

  // Sobrepõe o valor do contrato apenas para este profissional, quando preenchido.
  @IsOptional()
  @IsNumber()
  valorHora?: number;

  @IsOptional()
  @IsNumber()
  valorFixo?: number;

  // Limite de horas/mês deste profissional neste contrato. Vazio = sem limite.
  @IsOptional()
  @IsNumber()
  maxHorasMes?: number;

  // Como tratar o excedente quando maxHorasMes é ultrapassado.
  @IsOptional()
  @IsIn(['BANCO', 'BLOQUEIO'])
  modoExcedente?: string;

  // Código do projeto TOTVS/Protheus associado a este Analista neste contrato (ex: D000087309001).
  @IsOptional()
  @IsString()
  codigoProjeto?: string;

  @IsOptional()
  @IsString()
  nomeProjeto?: string;
}

export class AdiantamentoItemDto {
  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsNumber()
  valorTotal: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  parcelas: number;

  @IsNotEmpty()
  @IsNumber()
  valorParcela: number;

  @IsNotEmpty()
  dataInicio: string | Date;
}

export class CreateContratoDto {
  @IsNotEmpty({ message: 'O cliente é obrigatório.' })
  @IsInt()
  clienteId: number;

  // Gerente responsável pelo contrato (RBAC): gerencia/acompanha os Analistas alocados.
  @IsOptional()
  @IsInt()
  gerenteId?: number;

  @IsNotEmpty({ message: 'A descrição do contrato é obrigatória.' })
  @IsString()
  descricao: string;

  @IsOptional()
  @IsHexColor({ message: 'Informe uma cor hexadecimal válida (ex: #4CAF50).' })
  cor?: string;

  @IsNotEmpty({ message: 'Data de início é obrigatória.' })
  dtInicio: string | Date;

  @IsNotEmpty({ message: 'Data de fim é obrigatória.' })
  dtFim: string | Date;

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
  @IsBoolean()
  bloqueado?: boolean;

  @IsOptional()
  @IsString()
  coordenadorTotvs?: string;

  @IsOptional()
  @IsString()
  coordenadorCliente?: string;

  // Dados usados em relatórios TOTVS (ex: Termo de Validação): código do cliente, segmento e unidade.
  @IsOptional()
  @IsString()
  codigoCliente?: string;

  @IsOptional()
  @IsString()
  segmento?: string;

  @IsOptional()
  @IsString()
  unidadeTotvs?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProfissionalHabilitadoDto)
  profissionais?: ProfissionalHabilitadoDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EscalaItemDto)
  escalas?: EscalaItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AdiantamentoItemDto)
  adiantamentos?: AdiantamentoItemDto[];
}

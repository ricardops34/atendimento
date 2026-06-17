import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAgendamentoDto {
  @IsOptional()
  @IsInt()
  contratoId?: number;

  @IsOptional()
  @IsInt()
  profissionalId?: number;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsNotEmpty()
  @IsDateString()
  dataAgenda: string; // Esperado YYYY-MM-DD

  @IsNotEmpty()
  @IsString()
  horaInicio: string;

  @IsNotEmpty()
  @IsString()
  horaFim: string;

  @IsOptional()
  @IsString()
  horaIntervaloInicial?: string;

  @IsOptional()
  @IsString()
  horaIntervaloFinal?: string;

  @IsOptional()
  @IsString()
  local?: string;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  cor?: string;

  @IsOptional()
  @IsString()
  observacao?: string;
}

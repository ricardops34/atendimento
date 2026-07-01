import { IsNumber, IsOptional } from 'class-validator';

export class GerarMensalDto {
  @IsNumber()
  mes: number;

  @IsNumber()
  ano: number;

  @IsOptional()
  @IsNumber()
  contratoId?: number;

  @IsOptional()
  @IsNumber()
  profissionalId?: number;
}

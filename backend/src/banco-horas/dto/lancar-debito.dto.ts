import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

export class LancarDebitoDto {
  @IsNotEmpty({ message: 'A data é obrigatória.' })
  data: string | Date;

  @IsNumber()
  @IsPositive({ message: 'A quantidade de horas deve ser maior que zero.' })
  horas: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  descricao?: string;
}

import { IsNotEmpty, IsString, MaxLength, IsNumber } from 'class-validator';

export class CreatePaisDto {
  @IsNotEmpty({ message: 'O código IBGE/Bacen é obrigatório.' })
  @IsNumber({}, { message: 'O código IBGE/Bacen deve ser um número.' })
  id: number;

  @IsNotEmpty({ message: 'O nome do país é obrigatório.' })
  @IsString()
  @MaxLength(255)
  nome: string;

  @IsNotEmpty({ message: 'A sigla do país é obrigatória.' })
  @IsString()
  @MaxLength(2)
  sigla: string;
}

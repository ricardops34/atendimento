import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProfissionalDto {
  @IsNotEmpty({ message: 'O nome do profissional é obrigatório.' })
  @IsString()
  nome: string;

  @IsOptional()
  @IsInt()
  userId?: number;
}

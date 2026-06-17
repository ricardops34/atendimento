import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfissionalDto {
  @IsNotEmpty({ message: 'O nome do profissional é obrigatório.' })
  @IsString()
  nome: string;
}

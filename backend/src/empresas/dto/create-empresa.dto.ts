import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmpresaDto {
  @IsNotEmpty({ message: 'O nome da empresa é obrigatório.' })
  @IsString()
  nome: string;
}

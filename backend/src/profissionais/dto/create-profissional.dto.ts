import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProfissionalDto {
  @IsNotEmpty({ message: 'O nome do profissional é obrigatório.' })
  @IsString()
  nome: string;

  @IsOptional()
  @IsInt()
  userId?: number;

  // RBAC: Gerente responsável (outro Profissional). Define o time que o Gerente enxerga/administra.
  @IsOptional()
  @IsInt()
  gerenteId?: number;
}

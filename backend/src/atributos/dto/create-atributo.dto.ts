import { IsBoolean, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export const TIPOS_ATRIBUTO = ['Data', 'Texto', 'Numero', 'Email', 'Senha'] as const;
export const CADASTROS_ATRIBUTO = ['Cliente', 'Empresa', 'Contrato', 'Profissional'] as const;

export class CreateAtributoDto {
  @IsOptional()
  @IsInt()
  sequencia?: number;

  @IsNotEmpty({ message: 'O título do atributo é obrigatório.' })
  @IsString()
  titulo: string;

  @IsNotEmpty({ message: 'O tipo do atributo é obrigatório.' })
  @IsIn(TIPOS_ATRIBUTO, { message: 'Tipo inválido.' })
  tipo: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  tamanho?: number;

  @IsOptional()
  @IsBoolean()
  obrigatorio?: boolean;

  @IsNotEmpty({ message: 'O cadastro do atributo é obrigatório.' })
  @IsIn(CADASTROS_ATRIBUTO, { message: 'Cadastro inválido.' })
  cadastro: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}

import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEmpresaDto {
  @IsNotEmpty({ message: 'O nome da empresa é obrigatório.' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'O slug da empresa é obrigatório.' })
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  razaoSocial?: string;

  @IsOptional()
  @IsString()
  cnpj?: string;

  @IsOptional()
  @IsString()
  inscricaoEstadual?: string;

  @IsOptional()
  @IsString()
  inscricaoMunicipal?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsString()
  celular?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  cep?: string;

  @IsOptional()
  @IsString()
  logradouro?: string;

  @IsOptional()
  @IsString()
  numero?: string;

  @IsOptional()
  @IsString()
  complemento?: string;

  @IsOptional()
  @IsString()
  bairro?: string;

  @IsOptional()
  @IsString()
  uf?: string;

  @IsOptional()
  @IsString()
  municipio?: string;

  @IsOptional()
  @IsString()
  pais?: string;

  @IsOptional()
  @IsArray()
  atributos?: unknown[];
}

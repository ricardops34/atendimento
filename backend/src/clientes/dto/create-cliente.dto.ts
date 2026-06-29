import { IsDateString, IsEmail, IsHexColor, IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateClienteDto {
  @IsOptional()
  @IsString()
  @IsIn(['PF', 'PJ'])
  tipoPessoa?: string;

  @IsNotEmpty({ message: 'O nome e obrigatorio.' })
  @IsString()
  nome: string;

  // PJ
  @IsOptional() @IsString() @MaxLength(255) razaoSocial?: string;
  @IsOptional() @IsString() @MaxLength(18)  cnpj?: string;
  @IsOptional() @IsString() @MaxLength(20)  inscricaoEstadual?: string;
  @IsOptional() @IsString() @MaxLength(20)  inscricaoMunicipal?: string;

  // PF
  @IsOptional() @IsString() @MaxLength(14)  cpf?: string;
  @IsOptional() @IsString() @MaxLength(20)  rg?: string;
  @IsOptional() @IsDateString()             dataNascimento?: string;

  // Contato
  @IsOptional() @IsString() @MaxLength(20)  telefone?: string;
  @IsOptional() @IsString() @MaxLength(20)  celular?: string;
  @IsOptional() @IsEmail({}, { message: 'Informe um e-mail valido.' }) email?: string;

  // Endereço
  @IsOptional() @IsString() @MaxLength(9)   cep?: string;
  @IsOptional() @IsString() @MaxLength(255) logradouro?: string;
  @IsOptional() @IsString() @MaxLength(10)  numero?: string;
  @IsOptional() @IsString() @MaxLength(100) complemento?: string;
  @IsOptional() @IsString() @MaxLength(100) bairro?: string;
  @IsOptional() @IsString() @MaxLength(100) municipio?: string;
  @IsOptional() @IsString() @MaxLength(2)   uf?: string;
  @IsOptional() @IsString() @MaxLength(50)  pais?: string;

  // Agenda
  @IsOptional()
  @IsHexColor({ message: 'Informe uma cor hexadecimal valida (ex: #4CAF50).' })
  cor?: string;
}

import { IsHexColor, IsNotEmpty, IsOptional, IsString, MaxLength, IsEmail, IsNumber, IsArray, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ClienteAtributoValorDto {
  @IsInt()
  atributoId: number;

  // Formato varia conforme o tipo do atributo (Texto/Senha/Email = string, Numero = number, Data = string ISO).
  @IsOptional()
  conteudo?: string | number;
}

export class CreateClienteDto {
  @IsNotEmpty({ message: 'O nome do cliente é obrigatório.' })
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  razao?: string;

  @IsOptional()
  @IsHexColor({ message: 'Informe uma cor hexadecimal válida (ex: #4CAF50).' })
  cor?: string;

  @IsOptional()
  @IsString()
  endereco?: string;

  @IsOptional()
  @IsNumber()
  municipioId?: number;

  @IsOptional()
  @IsNumber()
  estadoId?: number;

  @IsOptional()
  @IsString()
  tipoPessoa?: string;

  @IsOptional()
  @IsString()
  documento?: string;

  @IsOptional()
  dataNascimento?: string;

  @IsOptional()
  @IsString()
  cep?: string;

  @IsOptional()
  @IsString()
  bairro?: string;

  @IsOptional()
  @IsString()
  numero?: string;

  @IsOptional()
  @IsString()
  complemento?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Informe um email válido.' })
  email?: string;

  @IsOptional()
  @IsNumber()
  paisId?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClienteAtributoValorDto)
  atributos?: ClienteAtributoValorDto[];
}

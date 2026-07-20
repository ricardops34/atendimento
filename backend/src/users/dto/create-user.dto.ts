import { IsArray, IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UserEmpresaLinkDto {
  @IsInt()
  empresaId: number;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Informe um email válido.' })
  email: string;

  @IsInt()
  profileId: number;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'A senha deve ter ao menos 6 caracteres.' })
  password?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserEmpresaLinkDto)
  empresaLinks?: UserEmpresaLinkDto[];
}

import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty({ message: 'O nome do perfil é obrigatório.' })
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  menuId?: number;
}

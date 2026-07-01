import { IsNumber, IsNotEmpty } from 'class-validator';

export class GerarNacionaisDto {
  @IsNumber()
  @IsNotEmpty()
  ano: number;
}

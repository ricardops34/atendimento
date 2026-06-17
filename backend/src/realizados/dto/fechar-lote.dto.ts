import { IsArray, IsInt, ArrayNotEmpty } from 'class-validator';

export class FecharLoteDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  agendamentoIds: number[];
}

export class CreateFeriadoDto {
  data: string | Date;
  descricao: string;
  tipo: string;
  fixo?: boolean;
  municipio?: string;
}

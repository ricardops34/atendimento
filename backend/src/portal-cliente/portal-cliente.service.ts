import { Injectable } from '@nestjs/common';
import { AgendamentosService } from '../agendamentos/agendamentos.service';

interface PortalListaQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  tipo?: string;
  local?: string;
  contratoId?: string;
  dataInicial?: string;
  dataFinal?: string;
}

@Injectable()
export class PortalClienteService {
  constructor(private readonly agendamentosService: AgendamentosService) {}

  // clienteId e empresaId vêm sempre do JWT (nunca de query/body do cliente) — ver ClienteContextGuard/EmpresaGuard.
  calendario(empresaId: number, clienteId: number) {
    return this.agendamentosService.findAll(empresaId, clienteId);
  }

  lista(query: PortalListaQuery, empresaId: number, clienteId: number) {
    return this.agendamentosService.search(query, empresaId, clienteId);
  }

  extrato(
    empresaId: number,
    clienteId: number,
    dataInicial: string,
    dataFinal: string,
    tipoExtrato: 'sintetico' | 'analitico' | 'calendario',
    format: 'pdf' | 'xls',
  ): Promise<Buffer> {
    return this.agendamentosService.generateExportExtrato(
      { empresaId, clienteId, dataInicial, dataFinal, tipoExtrato },
      format,
    );
  }
}

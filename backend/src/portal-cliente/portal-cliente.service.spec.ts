import { Test, TestingModule } from '@nestjs/testing';
import { PortalClienteService } from './portal-cliente.service';
import { AgendamentosService } from '../agendamentos/agendamentos.service';

describe('PortalClienteService', () => {
  let service: PortalClienteService;
  let agendamentosService: { findAll: jest.Mock; search: jest.Mock; generateExportExtrato: jest.Mock };

  beforeEach(async () => {
    agendamentosService = {
      findAll: jest.fn().mockResolvedValue([]),
      search: jest.fn().mockResolvedValue({ items: [], page: 1, pageSize: 20, total: 0, hasNext: false }),
      generateExportExtrato: jest.fn().mockResolvedValue(Buffer.from('pdf')),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [PortalClienteService, { provide: AgendamentosService, useValue: agendamentosService }],
    }).compile();

    service = module.get(PortalClienteService);
  });

  it('calendario delegates to AgendamentosService.findAll scoped by clienteId', async () => {
    await service.calendario(1, 15);
    expect(agendamentosService.findAll).toHaveBeenCalledWith(1, 15);
  });

  it('lista delegates to AgendamentosService.search scoped by clienteId', async () => {
    await service.lista({ tipo: 'A' }, 1, 15);
    expect(agendamentosService.search).toHaveBeenCalledWith({ tipo: 'A' }, 1, 15);
  });

  it('extrato delegates to AgendamentosService.generateExportExtrato with clienteId, tipoExtrato e format escolhidos', async () => {
    await service.extrato(1, 15, '2026-07-01', '2026-07-31', 'sintetico', 'xls');
    expect(agendamentosService.generateExportExtrato).toHaveBeenCalledWith(
      { empresaId: 1, clienteId: 15, dataInicial: '2026-07-01', dataFinal: '2026-07-31', tipoExtrato: 'sintetico' },
      'xls',
    );
  });
});

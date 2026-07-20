import { Test, TestingModule } from '@nestjs/testing';
import { PortalClienteController } from './portal-cliente.controller';
import { PortalClienteService } from './portal-cliente.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PortalClienteController', () => {
  let controller: PortalClienteController;
  let service: { calendario: jest.Mock; lista: jest.Mock; extrato: jest.Mock };

  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.setHeader = jest.fn();
    res.send = jest.fn();
    return res;
  };

  beforeEach(async () => {
    service = {
      calendario: jest.fn().mockResolvedValue([]),
      lista: jest.fn().mockResolvedValue({ items: [], page: 1, pageSize: 20, total: 0, hasNext: false }),
      extrato: jest.fn().mockResolvedValue(Buffer.from('pdf')),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortalClienteController],
      providers: [
        { provide: PortalClienteService, useValue: service },
        // MenuGuard (aplicado via @UseGuards no controller) depende de PrismaService;
        // não é exercitado nestes testes (chamamos os métodos do controller diretamente),
        // mas precisa existir para o módulo de teste compilar.
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    controller = module.get(PortalClienteController);
  });

  it('calendario usa empresaId/clienteId do request (nunca da query)', async () => {
    await controller.calendario({ empresaId: 1, clienteId: 15 });
    expect(service.calendario).toHaveBeenCalledWith(1, 15);
  });

  it('lista usa empresaId/clienteId do request e repassa a query de filtros', async () => {
    await controller.lista({ tipo: 'A' }, { empresaId: 1, clienteId: 15 });
    expect(service.lista).toHaveBeenCalledWith({ tipo: 'A' }, 1, 15);
  });

  it('extrato rejeita format diferente de pdf/xls', async () => {
    const res = mockResponse();
    await controller.extrato('doc', 'analitico', '2026-07-01', '2026-07-31', { empresaId: 1, clienteId: 15 }, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(service.extrato).not.toHaveBeenCalled();
  });

  it('extrato rejeita datas ausentes', async () => {
    const res = mockResponse();
    await controller.extrato('pdf', 'analitico', '', '2026-07-31', { empresaId: 1, clienteId: 15 }, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(service.extrato).not.toHaveBeenCalled();
  });

  it('extrato usa tipoExtrato "analitico" como padrão quando não informado ou inválido', async () => {
    const res = mockResponse();
    await controller.extrato('pdf', 'invalido', '2026-07-01', '2026-07-31', { empresaId: 1, clienteId: 15 }, res);
    expect(service.extrato).toHaveBeenCalledWith(1, 15, '2026-07-01', '2026-07-31', 'analitico', 'pdf');
  });

  it('extrato gera o PDF escopado ao cliente do request com o tipoExtrato escolhido', async () => {
    const res = mockResponse();
    await controller.extrato('pdf', 'sintetico', '2026-07-01', '2026-07-31', { empresaId: 1, clienteId: 15 }, res);
    expect(service.extrato).toHaveBeenCalledWith(1, 15, '2026-07-01', '2026-07-31', 'sintetico', 'pdf');
    expect(res.send).toHaveBeenCalledWith(Buffer.from('pdf'));
  });

  it('extrato gera XLS quando format=xls', async () => {
    const res = mockResponse();
    await controller.extrato('xls', 'analitico', '2026-07-01', '2026-07-31', { empresaId: 1, clienteId: 15 }, res);
    expect(service.extrato).toHaveBeenCalledWith(1, 15, '2026-07-01', '2026-07-31', 'analitico', 'xls');
    expect(res.setHeader).toHaveBeenCalledWith(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
  });
});

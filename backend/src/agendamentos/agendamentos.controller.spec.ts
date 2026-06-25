import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AgendamentosController } from './agendamentos.controller';
import { AgendamentosService } from './agendamentos.service';
import { ModuleGuard } from '../auth/guards/module.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TenantGuard } from '../auth/guards/tenant.guard';

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.setHeader = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('AgendamentosController', () => {
  let controller: AgendamentosController;

  const service = {
    create: jest.fn(),
    findAll: jest.fn(),
    search: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    confirmar: jest.fn(),
    generateExport: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgendamentosController],
      providers: [
        { provide: AgendamentosService, useValue: service },
        { provide: ModuleGuard, useValue: { canActivate: () => true } },
        { provide: JwtAuthGuard, useValue: { canActivate: () => true } },
        { provide: TenantGuard, useValue: { canActivate: () => true } },
      ],
    })
      .overrideGuard(JwtAuthGuard).useValue({ canActivate: () => true })
      .overrideGuard(TenantGuard).useValue({ canActivate: () => true })
      .overrideGuard(ModuleGuard).useValue({ canActivate: () => true })
      .compile();

    controller = module.get(AgendamentosController);
    jest.clearAllMocks();
  });

  it('delegates findAll to service', () => {
    controller.findAll({ user: { empresaId: 1 } } as any);
    expect(service.findAll).toHaveBeenCalledWith(1);
  });

  it('delegates search query to service', () => {
    controller.search({ page: '1', pageSize: '20', search: 'visita' } as any, { user: { empresaId: 1 } } as any);
    expect(service.search).toHaveBeenCalledWith({ page: '1', pageSize: '20', search: 'visita' }, 1);
  });

  it('confirmar calls service.confirmar with id and empresaId', async () => {
    const agendamento = { id: 1, tipo: 'R' };
    service.confirmar.mockResolvedValue(agendamento);
    const req = { user: { empresaId: 42 } };

    const result = await controller.confirmar(1, req as any);

    expect(service.confirmar).toHaveBeenCalledWith(1, 42);
    expect(result).toEqual(agendamento);
  });

  it('confirmar propagates 422 from service when status is not A', async () => {
    service.confirmar.mockRejectedValue(
      new HttpException('Registro não pode ser alterado.', HttpStatus.UNPROCESSABLE_ENTITY)
    );

    await expect(controller.confirmar(1, { user: { empresaId: 1 } } as any)).rejects.toMatchObject({
      status: 422,
    });
  });

  it('export returns csv buffer via response', async () => {
    const csvBuffer = Buffer.from('Data,Contrato\n');
    service.generateExport.mockResolvedValue(csvBuffer);
    const res = mockResponse();
    const req = { user: { empresaId: 1 } };

    await controller.export('csv', {}, req as any, res);

    expect(service.generateExport).toHaveBeenCalledWith(
      expect.objectContaining({ empresaId: 1 }),
      'csv'
    );
    expect(res.setHeader).toHaveBeenCalledWith('Content-Disposition', 'attachment; filename="atendimentos.csv"');
    expect(res.send).toHaveBeenCalledWith(csvBuffer);
  });

  it('export returns 400 for invalid format', async () => {
    const res = mockResponse();

    await controller.export('docx', {}, { user: { empresaId: 1 } } as any, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(service.generateExport).not.toHaveBeenCalled();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ClientesService', () => {
  let service: ClientesService;
  let prisma: {
    cliente: {
      create: jest.Mock;
      findMany: jest.Mock;
      findUnique: jest.Mock;
      findFirst: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
      count: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      cliente: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientesService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get(ClientesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns paginated companies with search and ordering', async () => {
    prisma.cliente.count.mockResolvedValue(3);
    prisma.cliente.findMany.mockResolvedValue([{ id: 2, nome: 'Beta' }]);

    const result = await service.search({
      page: '2',
      pageSize: '10',
      search: 'beta',
      sortProperty: 'nome',
      sortDirection: 'descending',
    }, 1);

    expect(prisma.cliente.count).toHaveBeenCalledWith({
      where: {
        empresaId: 1,
        nome: { contains: 'beta', mode: 'insensitive' },
      },
    });
    expect(prisma.cliente.findMany).toHaveBeenCalledWith({
      where: {
        empresaId: 1,
        nome: { contains: 'beta', mode: 'insensitive' },
      },
      orderBy: { nome: 'desc' },
      skip: 10,
      take: 10,
    });
    expect(result).toEqual({
      items: [{ id: 2, nome: 'Beta' }],
      page: 2,
      pageSize: 10,
      total: 3,
      hasNext: false,
    });
  });

  describe('vínculo usuarioId (Portal do Cliente)', () => {
    it('create repassa usuarioId para o Prisma junto com os demais campos', async () => {
      prisma.cliente.create.mockResolvedValue({ id: 15, nome: 'Cliente A', usuarioId: 88 });

      await service.create({ nome: 'Cliente A', usuarioId: 88 } as any, 1);

      expect(prisma.cliente.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ nome: 'Cliente A', usuarioId: 88, empresaId: 1 }),
      });
    });

    it('create converte violação de unique constraint em ConflictException amigável', async () => {
      prisma.cliente.create.mockRejectedValue({ code: 'P2002', meta: { target: ['usuario_id'] } });

      await expect(service.create({ nome: 'Cliente A', usuarioId: 88 } as any, 1)).rejects.toBeInstanceOf(
        ConflictException,
      );
    });

    it('update repassa usuarioId (inclusive null, para desvincular)', async () => {
      prisma.cliente.findFirst.mockResolvedValue({ id: 15, nome: 'Cliente A' });
      prisma.cliente.update.mockResolvedValue({ id: 15, nome: 'Cliente A', usuarioId: null });

      await service.update(15, { usuarioId: null } as any, 1);

      expect(prisma.cliente.update).toHaveBeenCalledWith({
        where: { id: 15 },
        data: expect.objectContaining({ usuarioId: null }),
      });
    });

    it('update converte violação de unique constraint em ConflictException amigável', async () => {
      prisma.cliente.findFirst.mockResolvedValue({ id: 15, nome: 'Cliente A' });
      prisma.cliente.update.mockRejectedValue({ code: 'P2002', meta: { target: ['usuario_id'] } });

      await expect(service.update(15, { usuarioId: 88 } as any, 1)).rejects.toBeInstanceOf(ConflictException);
    });

    it('findOne inclui o usuário vinculado (usuario)', async () => {
      prisma.cliente.findFirst.mockResolvedValue({ id: 15, nome: 'Cliente A', usuario: { id: 88, email: 'a@a.com' } });

      const result = await service.findOne(15, 1);

      expect(prisma.cliente.findFirst).toHaveBeenCalledWith({
        where: { id: 15, empresaId: 1 },
        include: expect.objectContaining({
          usuario: { select: { id: true, name: true, email: true, isActive: true } },
        }),
      });
      expect((result as any).usuario).toEqual({ id: 88, email: 'a@a.com' });
    });
  });
});

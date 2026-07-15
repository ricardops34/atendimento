import { NotFoundException } from '@nestjs/common';
import { MenusService } from './menus.service';

describe('MenusService', () => {
  const prisma: any = {
    menu: {
      count: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    menuItem: {
      count: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      createMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
    routine: { findUnique: jest.fn(), findMany: jest.fn() },
    profile: { count: jest.fn() },
    $transaction: jest.fn(),
  };
  const service = new MenusService(prisma);

  beforeEach(() => jest.clearAllMocks());

  it('returns menu headers in the PO UI paginated format', async () => {
    prisma.menu.count.mockResolvedValue(1);
    prisma.menu.findMany.mockResolvedValue([{ id: 1, title: 'Menu do Administrador', isActive: true }]);

    await expect(service.search({ page: '1', pageSize: '20' })).resolves.toEqual({
      items: [{ id: 1, title: 'Menu do Administrador', isActive: true }],
      page: 1,
      pageSize: 20,
      total: 1,
      hasNext: false,
    });
  });

  it('creates an item linking menu and routine', async () => {
    prisma.menu.findUnique.mockResolvedValue({ id: 1, title: 'Menu do Administrador' });
    prisma.routine.findUnique.mockResolvedValue({
      id: 7,
      moduleId: 2,
      name: 'Clientes',
      key: 'clientes-list',
      path: '/clientes',
      module: { id: 2, name: 'Cadastro' },
    });
    prisma.menuItem.create.mockResolvedValue({
      id: 10,
      menuId: 1,
      routineId: 7,
      sortOrder: 5,
      isActive: true,
      menu: { title: 'Menu do Administrador' },
      routine: {
        id: 7,
        moduleId: 2,
        name: 'Clientes',
        key: 'clientes-list',
        path: '/clientes',
        module: { id: 2, name: 'Cadastro' },
      },
    });

    await expect(service.createRoutineLink({ menuId: 1, routineId: 7, sortOrder: 5 })).resolves.toMatchObject({
      id: 10,
      menu: 'Menu do Administrador',
      module: 'Cadastro',
      routine: 'Clientes',
    });
  });

  it('rejects an item when the menu does not exist', async () => {
    prisma.menu.findUnique.mockResolvedValue(null);
    prisma.routine.findUnique.mockResolvedValue({ id: 7 });
    await expect(service.createRoutineLink({ menuId: 999, routineId: 7 })).rejects.toBeInstanceOf(NotFoundException);
  });

  it('returns the menu header with its routine details', async () => {
    prisma.menu.findUnique.mockResolvedValue({
      id: 1,
      title: 'Menu do Administrador',
      isActive: true,
      items: [{
        id: 10,
        menuId: 1,
        routineId: 7,
        sortOrder: 5,
        isActive: true,
        menu: { title: 'Menu do Administrador' },
        routine: {
          id: 7,
          moduleId: 2,
          name: 'Clientes',
          key: 'clientes-list',
          path: '/clientes',
          module: { id: 2, name: 'Cadastro' },
        },
      }],
    });

    await expect(service.findOne(1)).resolves.toMatchObject({
      id: 1,
      title: 'Menu do Administrador',
      items: [{ id: 10, module: 'Cadastro', routine: 'Clientes', routineId: 7 }],
    });
  });

  it('updates the menu header and replaces its details in one transaction', async () => {
    const saved = {
      id: 1,
      title: 'Menu do Administrador',
      isActive: true,
      items: [],
    };
    prisma.menu.findUnique.mockResolvedValueOnce({ id: 1 }).mockResolvedValueOnce(saved);
    prisma.routine.findMany.mockResolvedValue([
      { id: 7, key: 'clientes-list' },
      { id: 8, key: 'configuracoes-menus' },
    ]);
    prisma.$transaction.mockImplementation((operation: any) => operation(prisma));
    prisma.menu.update.mockResolvedValue({ id: 1 });
    prisma.menuItem.deleteMany.mockResolvedValue({ count: 1 });
    prisma.menuItem.createMany.mockResolvedValue({ count: 2 });

    const payload = {
      title: 'Menu do Administrador',
      isActive: true,
      items: [
        { routineId: 7, sortOrder: 10, isActive: true },
        { routineId: 8, sortOrder: 20, isActive: false },
      ],
    };

    await expect(service.update(1, payload)).resolves.toEqual(saved);
    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
    expect(prisma.menuItem.deleteMany).toHaveBeenCalledWith({ where: { menuId: 1 } });
    expect(prisma.menuItem.createMany).toHaveBeenCalledWith({
      data: [
        { menuId: 1, routineId: 7, sortOrder: 10, isActive: true },
        { menuId: 1, routineId: 8, sortOrder: 20, isActive: false },
      ],
    });
  });
});

import { ContratosService } from './contratos/contratos.service';
import { FeriadosService } from './feriados/feriados.service';
import { AtributosService } from './atributos/atributos.service';
import { ProfissionaisService } from './profissionais/profissionais.service';
import { PaisesService } from './paises/paises.service';

describe('advanced search filters', () => {
  it('filters contracts by client name', () => {
    const service = new ContratosService({} as any);

    expect((service as any).buildWhere({ clienteNome: 'Acme' }, 1)).toEqual({
      AND: [
        { empresaId: 1 },
        { cliente: { nome: { contains: 'Acme', mode: 'insensitive' } } },
      ],
    });
  });

  it('filters holidays by type and fixed status', () => {
    const service = new FeriadosService({} as any);

    expect((service as any).buildWhere({ tipo: 'N', fixo: 'true' }, 1)).toEqual({
      empresaId: 1,
      tipo: 'N',
      fixo: true,
    });
  });

  it('filters attributes by title, type and required status', () => {
    const service = new AtributosService({} as any);

    expect((service as any).buildWhere({
      titulo: 'E-mail',
      tipo: 'Email',
      obrigatorio: 'true',
    }, 1)).toEqual({
      empresaId: 1,
      titulo: { contains: 'E-mail', mode: 'insensitive' },
      tipo: 'Email',
      obrigatorio: true,
    });
  });

  it('filters professionals by system user name', () => {
    const service = new ProfissionaisService({} as any);

    expect((service as any).buildWhere({ userName: 'Ricardo' }, 1)).toEqual({
      empresaId: 1,
      user: { name: { contains: 'Ricardo', mode: 'insensitive' } },
    });
  });

  it('filters countries by code, name and abbreviation', async () => {
    const prisma = {
      pais: {
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
      },
    };
    const service = new PaisesService(prisma as any);

    await service.search({ page: 1, pageSize: 20, id: '76', nome: 'Brasil', sigla: 'BR' });

    expect(prisma.pais.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: {
        id: 76,
        nome: { contains: 'Brasil', mode: 'insensitive' },
        sigla: { equals: 'BR', mode: 'insensitive' },
      },
    }));
  });
});

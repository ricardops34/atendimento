import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAtributoDto } from './dto/create-atributo.dto';
import { UpdateAtributoDto } from './dto/update-atributo.dto';

interface AtributoSearchQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  id?: string;
  titulo?: string;
  tipo?: string;
  cadastro?: string;
  obrigatorio?: string;
  ativo?: string;
  sortProperty?: string;
  sortDirection?: string;
}

@Injectable()
export class AtributosService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAtributoDto, empresaId: number) {
    const sequencia = dto.sequencia ?? 0;
    await this.abrirEspacoNaSequencia(empresaId, dto.cadastro, sequencia);

    return this.prisma.atributo.create({
      data: {
        empresaId,
        sequencia,
        titulo: dto.titulo,
        tipo: dto.tipo,
        tamanho: dto.tamanho,
        obrigatorio: dto.obrigatorio ?? false,
        cadastro: dto.cadastro,
        ativo: dto.ativo ?? true,
      },
    });
  }

  /**
   * Ao inserir/mover um atributo para uma sequência já ocupada (dentro do mesmo cadastro),
   * empurra pra frente (+1) todos os outros que estejam a partir dessa posição, preservando a ordem.
   */
  private async abrirEspacoNaSequencia(empresaId: number, cadastro: string, sequencia: number, excludeId?: number) {
    const where: any = { empresaId, cadastro, sequencia: { gte: sequencia } };
    if (excludeId) where.id = { not: excludeId };

    await this.prisma.atributo.updateMany({ where, data: { sequencia: { increment: 1 } } });
  }

  findAll(empresaId: number, cadastro?: string, ativo?: boolean) {
    const where: any = { empresaId };
    if (cadastro) where.cadastro = cadastro;
    if (ativo !== undefined) where.ativo = ativo;
    return this.prisma.atributo.findMany({ where, orderBy: { sequencia: 'asc' } });
  }

  async search(query: AtributoSearchQuery, empresaId: number) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const where = this.buildWhere(query, empresaId);

    const total = await this.prisma.atributo.count({ where });
    const items = await this.prisma.atributo.findMany({
      where,
      orderBy: this.buildOrderBy(query.sortProperty, query.sortDirection),
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const itemsComUso = await Promise.all(
      items.map(async (item) => ({
        ...item,
        emUso: await this.estaEmUso(item.id, item.cadastro, empresaId),
      })),
    );

    return { items: itemsComUso, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number, empresaId?: number) {
    const where: any = { id };
    if (empresaId) where.empresaId = empresaId;

    const atributo = await this.prisma.atributo.findFirst({ where });
    if (!atributo) throw new NotFoundException('Atributo não encontrado.');
    return atributo;
  }

  async update(id: number, dto: UpdateAtributoDto, empresaId?: number) {
    const atual = await this.findOne(id, empresaId);

    if (dto.sequencia !== undefined) {
      const cadastro = dto.cadastro ?? atual.cadastro;
      await this.abrirEspacoNaSequencia(atual.empresaId, cadastro, dto.sequencia, id);
    }

    return this.prisma.atributo.update({ where: { id }, data: { ...dto } });
  }

  async remove(id: number, empresaId?: number) {
    const atributo = await this.findOne(id, empresaId);

    if (await this.estaEmUso(id, atributo.cadastro, empresaId)) {
      throw new BadRequestException(
        'Este atributo já possui valores preenchidos em algum registro. Desative-o em vez de excluir.',
      );
    }

    return this.prisma.atributo.delete({ where: { id } });
  }

  private async estaEmUso(atributoId: number, cadastro: string, empresaId?: number): Promise<boolean> {
    const modelPorCadastro: Record<string, any> = {
      Cliente: this.prisma.cliente,
      Empresa: this.prisma.empresa,
      Contrato: this.prisma.contrato,
      Profissional: this.prisma.profissional,
    };
    const model = modelPorCadastro[cadastro];
    if (!model) return false;

    const where: any = { atributos: { not: null } };
    if (empresaId) {
      if (cadastro === 'Empresa') where.id = empresaId;
      else where.empresaId = empresaId;
    }

    const registros: Array<{ atributos: any }> = await model.findMany({ where, select: { atributos: true } });
    return registros.some(
      (r) => Array.isArray(r.atributos) && r.atributos.some((valor: any) => valor?.atributoId === atributoId),
    );
  }

  private buildWhere(query: AtributoSearchQuery, empresaId?: number) {
    const where: any = {};
    if (empresaId) where.empresaId = empresaId;

    if (query.id) {
      where.id = Number(query.id);
      return where;
    }

    if (query.cadastro) where.cadastro = query.cadastro;
    if (query.tipo) where.tipo = query.tipo;
    if (query.obrigatorio === 'true' || query.obrigatorio === 'false') {
      where.obrigatorio = query.obrigatorio === 'true';
    }
    if (query.ativo !== undefined) where.ativo = query.ativo === 'true';

    const titulo = query.titulo?.trim() || query.search?.trim();
    if (titulo) where.titulo = { contains: titulo, mode: 'insensitive' as const };

    return where;
  }

  private buildOrderBy(sortProperty?: string, sortDirection?: string) {
    const direction = sortDirection === 'descending' ? 'desc' : 'asc';
    const property = sortProperty || 'sequencia';
    return { [property]: direction };
  }
}

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

interface ClienteSearchQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  id?: string;
  nome?: string;
  sortProperty?: string;
  sortDirection?: string;
}

const UNIQUE_CONSTRAINT_ERROR_CODE = 'P2002';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateClienteDto, empresaId: number) {
    const data: any = { ...dto, empresaId };
    if (data.dataNascimento) {
      data.dataNascimento = new Date(data.dataNascimento);
    }
    try {
      return await this.prisma.cliente.create({ data });
    } catch (e) {
      throw this.mapUsuarioIdConflict(e);
    }
  }

  findAll(empresaId: number) {
    return this.prisma.cliente.findMany({
      where: { empresaId },
      orderBy: { nome: 'asc' },
      include: { municipio: true, estadoRel: true, paisRel: true }
    });
  }

  async search(query: ClienteSearchQuery, empresaId: number) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const where = this.buildWhere(query, empresaId);
    const total = await this.prisma.cliente.count({ where });
    const items = await this.prisma.cliente.findMany({
      where,
      orderBy: this.buildOrderBy(query.sortProperty, query.sortDirection),
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { municipio: true, estadoRel: true, paisRel: true }
    });

    const mappedItems = items.map(i => ({
      ...i,
      documento: this.formatDocumento(i.documento, i.tipoPessoa),
      cidade: i.municipio?.nome || i.cidade || '',
      estadoSigla: i.estadoRel?.sigla || i.estado || '',
      paisNome: i.paisRel?.nome || i.pais || ''
    }));

    return { items: mappedItems, page, pageSize, total, hasNext: page * pageSize < total };
  }

  private formatDocumento(documento?: string | null, tipoPessoa?: string): string {
    if (!documento) return '';
    const digits = documento.replace(/\D/g, '');
    if (tipoPessoa === 'J' && digits.length === 14) {
      return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    if (tipoPessoa === 'F' && digits.length === 11) {
      return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return documento;
  }

  async findOne(id: number, empresaId?: number) {
    const where: any = { id };
    if (empresaId) where.empresaId = empresaId;

    const cliente = await this.prisma.cliente.findFirst({
      where,
      include: {
        municipio: true,
        estadoRel: true,
        paisRel: true,
        // Vínculo com o usuário de login do Portal do Cliente (feature 003-acesso-cliente-atendimentos).
        usuario: { select: { id: true, name: true, email: true, isActive: true } },
      }
    });
    if (!cliente) throw new NotFoundException('Cliente não encontrado.');
    return cliente;
  }

  async update(id: number, dto: UpdateClienteDto, empresaId?: number) {
    await this.findOne(id, empresaId);
    const data: any = { ...dto };
    if (data.dataNascimento) {
      data.dataNascimento = new Date(data.dataNascimento);
    }
    try {
      return await this.prisma.cliente.update({ where: { id }, data });
    } catch (e) {
      throw this.mapUsuarioIdConflict(e);
    }
  }

  async remove(id: number, empresaId?: number) {
    await this.findOne(id, empresaId);
    return this.prisma.cliente.delete({ where: { id } });
  }

  // usuarioId é único (vínculo 1:1, RN-03): se o usuário escolhido já estiver vinculado
  // a outro Cliente, o Postgres rejeita com violação de unique constraint (P2002).
  // Convertido aqui numa mensagem amigável em vez de vazar o erro cru do Prisma.
  private mapUsuarioIdConflict(e: any) {
    if (e?.code === UNIQUE_CONSTRAINT_ERROR_CODE && e?.meta?.target?.includes?.('usuario_id')) {
      return new ConflictException('Este usuário já está vinculado a outro cliente.');
    }
    return e;
  }

  private buildWhere(query: ClienteSearchQuery, empresaId?: number) {
    const where: any = {};
    if (empresaId) where.empresaId = empresaId;

    if (query.id) {
      where.id = Number(query.id);
      return where;
    }
    const nome = query.nome?.trim() || query.search?.trim();
    if (!nome) return where;
    where.nome = { contains: nome, mode: 'insensitive' as const };
    return where;
  }

  private buildOrderBy(sortProperty?: string, sortDirection?: string) {
    const direction = sortDirection === 'descending' ? 'desc' : 'asc';
    const property = sortProperty === 'id' ? 'id' : 'nome';
    return { [property]: direction };
  }
}

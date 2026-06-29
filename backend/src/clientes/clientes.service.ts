import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

interface ClienteSearchQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  id?: string;
  nome?: string;
  cnpj?: string;
  cpf?: string;
  tipoPessoa?: string;
  municipio?: string;
  uf?: string;
  sortProperty?: string;
  sortDirection?: string;
}

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateClienteDto, empresaId: number) {
    return this.prisma.cliente.create({
      data: { ...dto, empresaId },
    });
  }

  findAll(empresaId: number) {
    return this.prisma.cliente.findMany({ where: { empresaId }, orderBy: { nome: 'asc' } });
  }

  async search(query: any, empresaId: number) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const where = this.buildWhere(query, empresaId);
    const total = await this.prisma.cliente.count({ where });
    const items = await this.prisma.cliente.findMany({
      where,
      orderBy: this.buildOrderBy(query),
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { items, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number, empresaId?: number) {
    const where: any = { id };
    if (empresaId) where.empresaId = empresaId;

    const cliente = await this.prisma.cliente.findFirst({ where });
    if (!cliente) throw new NotFoundException('Cliente não encontrado.');
    return cliente;
  }

  async update(id: number, dto: UpdateClienteDto, empresaId?: number) {
    await this.findOne(id, empresaId);
    return this.prisma.cliente.update({ where: { id }, data: dto });
  }

  async remove(id: number, empresaId?: number) {
    await this.findOne(id, empresaId);
    return this.prisma.cliente.delete({ where: { id } });
  }

  private buildWhere(query: ClienteSearchQuery, empresaId?: number) {
    const where: any = {};
    if (empresaId) where.empresaId = empresaId;
    if (query.id) { where.id = Number(query.id); return where; }
    if (query.tipoPessoa) where.tipoPessoa = query.tipoPessoa;
    if (query.uf?.trim()) where.uf = { equals: query.uf.trim(), mode: 'insensitive' };

    const andFilters: object[] = [];
    const search = query.search?.trim();
    if (search) {
      andFilters.push({
        OR: [
          { nome:      { contains: search, mode: 'insensitive' } },
          { cnpj:      { contains: search, mode: 'insensitive' } },
          { cpf:       { contains: search, mode: 'insensitive' } },
          { email:     { contains: search, mode: 'insensitive' } },
          { municipio: { contains: search, mode: 'insensitive' } },
        ],
      });
    }
    if (query.nome?.trim())      andFilters.push({ nome:      { contains: query.nome.trim(),      mode: 'insensitive' } });
    if (query.cnpj?.trim())      andFilters.push({ cnpj:      { contains: query.cnpj.trim(),      mode: 'insensitive' } });
    if (query.cpf?.trim())       andFilters.push({ cpf:       { contains: query.cpf.trim(),       mode: 'insensitive' } });
    if (query.municipio?.trim()) andFilters.push({ municipio: { contains: query.municipio.trim(), mode: 'insensitive' } });

    if (andFilters.length > 0) where.AND = andFilters;
    return where;
  }

  private buildOrderBy(query: any) {
    // Accept both our format (sortProperty/sortDirection) and PO UI dynamic format (sort.property/sort.type)
    const sortProp = query.sortProperty || query.sort?.property || 'nome';
    const sortDir  = query.sortDirection || query.sort?.type || 'ascending';
    const direction = sortDir === 'descending' ? 'desc' : 'asc';
    const allowed = ['id', 'nome', 'cnpj', 'cpf', 'municipio', 'uf', 'email'];
    const property = allowed.includes(sortProp) ? sortProp : 'nome';
    return { [property]: direction };
  }
}

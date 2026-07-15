import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeriadoDto } from './dto/create-feriado.dto';
import { UpdateFeriadoDto } from './dto/update-feriado.dto';

interface FeriadoSearchQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  id?: string;
  descricao?: string;
  ano?: string;
  dataDe?: string;
  dataAte?: string;
  tipo?: string;
  fixo?: string;
  sortProperty?: string;
  sortDirection?: string;
}

@Injectable()
export class FeriadosService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateFeriadoDto, empresaId: number) {
    return this.prisma.feriado.create({
      data: {
        empresaId,
        data: new Date(dto.data),
        descricao: dto.descricao,
        tipo: dto.tipo,
        fixo: dto.fixo ?? true,
        municipio: dto.municipio,
      },
    });
  }

  findAll(empresaId: number) {
    return this.prisma.feriado.findMany({ 
      where: { empresaId }, 
      orderBy: { data: 'asc' } 
    });
  }

  async search(query: FeriadoSearchQuery, empresaId: number) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const where = this.buildWhere(query, empresaId);
    
    const total = await this.prisma.feriado.count({ where });
    const items = await this.prisma.feriado.findMany({
      where,
      orderBy: this.buildOrderBy(query.sortProperty, query.sortDirection),
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { items, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number, empresaId?: number) {
    const where: any = { id };
    if (empresaId) where.empresaId = empresaId;

    const feriado = await this.prisma.feriado.findFirst({ where });
    if (!feriado) throw new NotFoundException('Feriado não encontrado.');
    return feriado;
  }

  async update(id: number, dto: UpdateFeriadoDto, empresaId?: number) {
    await this.findOne(id, empresaId);
    return this.prisma.feriado.update({ 
      where: { id }, 
      data: {
        data: dto.data ? new Date(dto.data) : undefined,
        descricao: dto.descricao,
        tipo: dto.tipo,
        fixo: dto.fixo,
        municipio: dto.municipio,
      } 
    });
  }

  async remove(id: number, empresaId?: number) {
    await this.findOne(id, empresaId);
    return this.prisma.feriado.delete({ where: { id } });
  }

  private buildWhere(query: FeriadoSearchQuery, empresaId?: number) {
    const where: any = {};
    if (empresaId) where.empresaId = empresaId;

    if (query.id) {
      where.id = Number(query.id);
      return where;
    }
    
    if (query.ano) {
      const year = Number(query.ano);
      where.data = {
        gte: new Date(Date.UTC(year, 0, 1, 0, 0, 0)),
        lte: new Date(Date.UTC(year, 11, 31, 23, 59, 59))
      };
    } else if (query.dataDe || query.dataAte) {
      where.data = {};
      if (query.dataDe) where.data.gte = new Date(query.dataDe);
      if (query.dataAte) {
        const d = new Date(query.dataAte);
        d.setUTCHours(23, 59, 59, 999);
        where.data.lte = d;
      }
    }

    const descricao = query.descricao?.trim() || query.search?.trim();
    if (descricao) {
      where.descricao = { contains: descricao, mode: 'insensitive' as const };
    }
    if (query.tipo) where.tipo = query.tipo;
    if (query.fixo === 'true' || query.fixo === 'false') {
      where.fixo = query.fixo === 'true';
    }
    return where;
  }

  private buildOrderBy(sortProperty?: string, sortDirection?: string) {
    const direction = sortDirection === 'descending' ? 'desc' : 'asc';
    const property = sortProperty || 'data';
    return { [property]: direction };
  }

  async gerarNacionais(ano: number, empresaId: number) {
    const feriadosNacionaisFixos = [
      { mes: 1, dia: 1, desc: "Confraternização Universal" },
      { mes: 4, dia: 21, desc: "Tiradentes" },
      { mes: 5, dia: 1, desc: "Dia do Trabalhador" },
      { mes: 9, dia: 7, desc: "Independência do Brasil" },
      { mes: 10, dia: 12, desc: "Nossa Senhora Aparecida" },
      { mes: 11, dia: 2, desc: "Finados" },
      { mes: 11, dia: 15, desc: "Proclamação da República" },
      { mes: 12, dia: 25, desc: "Natal" }
    ];

    let gerados = 0;

    // Feriados Fixos
    for (const f of feriadosNacionaisFixos) {
      const dateStr = `${ano}-${String(f.mes).padStart(2, '0')}-${String(f.dia).padStart(2, '0')}T00:00:00.000Z`;
      const data = new Date(dateStr);

      const existe = await this.prisma.feriado.findFirst({
        where: { empresaId, descricao: f.desc }
      });

      if (!existe) {
        await this.prisma.feriado.create({
          data: { empresaId, data, descricao: f.desc, tipo: 'N', fixo: true }
        });
        gerados++;
      }
    }

    // Feriados Variáveis (Cálculo da Páscoa)
    const a = ano % 19;
    const b = Math.floor(ano / 100);
    const c = ano % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const fCalc = Math.floor((b + 8) / 25);
    const g = Math.floor((b - fCalc + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    const pascoa = new Date(Date.UTC(ano, month - 1, day, 0, 0, 0));

    const sextaSanta = new Date(pascoa.getTime()); sextaSanta.setUTCDate(pascoa.getUTCDate() - 2);
    const carnaval = new Date(pascoa.getTime()); carnaval.setUTCDate(pascoa.getUTCDate() - 47);
    const corpusChristi = new Date(pascoa.getTime()); corpusChristi.setUTCDate(pascoa.getUTCDate() + 60);

    const variaveis = [
      { data: pascoa, desc: "Páscoa" },
      { data: sextaSanta, desc: "Sexta-Feira da Paixão" },
      { data: carnaval, desc: "Carnaval" },
      { data: corpusChristi, desc: "Corpus Christi" }
    ];

    for (const v of variaveis) {
      const existe = await this.prisma.feriado.findFirst({
        where: {
          empresaId,
          descricao: v.desc,
          data: v.data
        }
      });

      if (!existe) {
        await this.prisma.feriado.create({
          data: { empresaId, data: v.data, descricao: v.desc, tipo: 'N', fixo: false }
        });
        gerados++;
      }
    }

    if (gerados > 0) {
      try {
        await this.prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('feriado', 'id'), coalesce(max(id),0) + 1, false) FROM feriado;`);
      } catch (e) {
        // Ignorar se não for Postgres ou der erro na sequence
      }
    }

    return { gerados };
  }
}

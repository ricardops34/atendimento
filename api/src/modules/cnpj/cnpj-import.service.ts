import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as fs from 'fs';
import * as readline from 'readline';

@Injectable()
export class CnpjImportService {
  private readonly logger = new Logger(CnpjImportService.name);

  constructor(private prisma: PrismaService) {}

  async importEmpresas(filePath: string) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let count = 0;
    let batch: any[] = [];

    for await (const line of rl) {
      // O CSV da RFB usa ";" como separador e aspas duplas
      const cols = line.split(';').map(c => c.replace(/"/g, ''));
      
      if (cols.length >= 7) {
        batch.push({
          cnpjBasico: cols[0],
          razaoSocial: cols[1],
          naturezaJuridica: cols[2],
          qualificacaoResp: cols[3],
          capitalSocial: parseFloat(cols[4].replace(',', '.')) || 0,
          porteEmpresa: cols[5],
          enteFederativo: cols[6]
        });
      }

      if (batch.length >= 1000) {
        await this.prisma.cnpjEmpresa.createMany({
          data: batch,
          skipDuplicates: true
        });
        count += batch.length;
        this.logger.log(`Importadas ${count} empresas...`);
        batch = [];
      }
    }

    if (batch.length > 0) {
      await this.prisma.cnpjEmpresa.createMany({ data: batch, skipDuplicates: true });
    }
    
    return { imported: count + batch.length };
  }

  async importEstabelecimentos(filePath: string) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let count = 0;
    let batch: any[] = [];

    for await (const line of rl) {
      const cols = line.split(';').map(c => c.replace(/"/g, ''));
      
      if (cols.length >= 30) {
        batch.push({
          cnpjBasico: cols[0],
          cnpjOrdem: cols[1],
          cnpjDv: cols[2],
          identificadorMatriz: parseInt(cols[3]) || 1,
          nomeFantasia: cols[4],
          situacaoCadastral: cols[5],
          dataSituacao: cols[6],
          motivoSituacao: cols[7],
          nomeCidadeExterior: cols[8],
          paisId: cols[9],
          dataInicioAtividade: cols[10],
          cnaeFiscalPrincipal: cols[11],
          cnaeFiscalSecundaria: cols[12],
          tipoLogradouro: cols[13],
          logradouro: cols[14],
          numero: cols[15],
          complemento: cols[16],
          bairro: cols[17],
          cep: cols[18],
          uf: cols[19],
          municipio: cols[20],
          ddd1: cols[21],
          telefone1: cols[22],
          ddd2: cols[23],
          telefone2: cols[24],
          dddFax: cols[25],
          fax: cols[26],
          email: cols[27],
          situacaoEspecial: cols[28],
          dataSituacaoEspecial: cols[29]
        });
      }

      if (batch.length >= 1000) {
        await this.prisma.cnpjEstabelecimento.createMany({
          data: batch,
          skipDuplicates: true
        });
        count += batch.length;
        this.logger.log(`Importados ${count} estabelecimentos...`);
        batch = [];
      }
    }

    if (batch.length > 0) {
      await this.prisma.cnpjEstabelecimento.createMany({ data: batch, skipDuplicates: true });
    }
    
    return { imported: count + batch.length };
  }

  async importAuxiliary(filePath: string, type: 'CNAE' | 'MUNIC' | 'PAIS' | 'NATU' | 'QUAL' | 'MOTI') {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let count = 0;
    let batch: any[] = [];

    for await (const line of rl) {
      const cols = line.split(';').map(c => c.replace(/"/g, ''));
      
      if (cols.length >= 2) {
        const code = cols[0];
        const description = cols[1];

        if (type === 'CNAE') {
          batch.push({ code, description });
        } else if (type === 'PAIS') {
          batch.push({ code, name: description });
        } else {
          batch.push({ type, code, description });
        }
      }

      if (batch.length >= 1000) {
        await this.saveAuxiliaryBatch(type, batch);
        count += batch.length;
        this.logger.log(`Importados ${count} registros auxiliares do tipo ${type}...`);
        batch = [];
      }
    }

    if (batch.length > 0) {
      await this.saveAuxiliaryBatch(type, batch);
    }
    
    return { imported: count + batch.length };
  }

  private async saveAuxiliaryBatch(type: string, data: any[]) {
    if (type === 'CNAE') {
      return this.prisma.cnae.createMany({ data, skipDuplicates: true });
    } else if (type === 'PAIS') {
      return this.prisma.country.createMany({ data, skipDuplicates: true });
    } else {
      return this.prisma.cnpjAuxiliary.createMany({ data, skipDuplicates: true });
    }
  }
}

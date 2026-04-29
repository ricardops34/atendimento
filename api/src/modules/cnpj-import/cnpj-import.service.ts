import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import axios from 'axios';
import * as unzipper from 'unzipper';
import * as iconv from 'iconv-lite';
import { Readable } from 'stream';
const csv = require('csv-parser');

@Injectable()
export class CnpjImportService {
  private readonly logger = new Logger(CnpjImportService.name);
  private readonly baseUrl = 'https://arquivos.receitafederal.gov.br/index.php/s/YggdBLfdninEJX9/download';

  constructor(private prisma: PrismaService) {}

  async startImport(type: 'EMPRESAS' | 'ESTABELECIMENTOS', folder: string, files: string[]) {
    this.logger.log(`Solicitação de importação: ${type} - Pasta: ${folder} - Arquivos: ${files.length}`);
    
    try {
      const importTask = await this.prisma.importStatus.create({
        data: {
          type: `RFB_${type}`,
          status: 'PROCESSING',
          totalFiles: files.length,
          currentFile: 0,
          message: `Iniciando importação de ${type}...`,
        },
      });

      // Roda em background sem dar await no processo total
      this.runImportTask(importTask.id, type, folder, files).catch(err => {
        this.logger.error(`Erro na tarefa de importação ${importTask.id}: ${err.message}`);
      });

      return importTask;
    } catch (error) {
      this.logger.error(`Falha ao criar tarefa de importação: ${error.message}`);
      throw new Error(`Erro interno ao registrar tarefa: ${error.message}`);
    }
  }

  private async runImportTask(taskId: string, type: string, folder: string, files: string[]) {
    try {
      for (let i = 0; i < files.length; i++) {
        const fileName = files[i];
        await this.prisma.importStatus.update({
          where: { id: taskId },
          data: { 
            currentFile: i + 1,
            message: `Baixando e processando ${fileName}...`,
            progress: (i / files.length) * 100
          }
        });

        const downloadUrl = `${this.baseUrl}?path=%2F${folder}&files=${fileName}`;
        await this.processFile(type, downloadUrl);
      }

      await this.prisma.importStatus.update({
        where: { id: taskId },
        data: { 
          status: 'COMPLETED',
          progress: 100,
          message: 'Importação concluída com sucesso!'
        }
      });
    } catch (error) {
      await this.prisma.importStatus.update({
        where: { id: taskId },
        data: { 
          status: 'FAILED',
          error: error.message,
          message: 'Erro durante o processamento.'
        }
      });
    }
  }

  private async processFile(type: string, url: string) {
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream',
    });

    return new Promise((resolve, reject) => {
      response.data
        .pipe(unzipper.Parse())
        .on('entry', (entry) => {
          const fileName = entry.path;
          this.logger.log(`Processando arquivo interno: ${fileName}`);

          let buffer: any[] = [];
          const batchSize = 1000;

          entry
            .pipe(iconv.decodeStream('iso-8859-1'))
            .pipe(csv({ separator: ';', headers: false }))
            .on('data', async (row) => {
              const data = type === 'EMPRESAS' ? this.mapEmpresa(row) : this.mapEstabelecimento(row);
              if (data) buffer.push(data);

              if (buffer.length >= batchSize) {
                const currentBatch = [...buffer];
                buffer = [];
                // Pausa o stream para processar o banco
                entry.pause();
                await this.saveBatch(type, currentBatch);
                entry.resume();
              }
            })
            .on('end', async () => {
              if (buffer.length > 0) {
                await this.saveBatch(type, buffer);
              }
              resolve(true);
            })
            .on('error', (err) => reject(err));
        })
        .on('error', (err) => reject(err));
    });
  }

  private mapEmpresa(row: any) {
    // 0:cnpj_basico, 1:razao_social, 2:natureza_juridica, 3:qualif_resp, 4:capital_social, 5:porte, 6:ente_fed
    try {
      return {
        cnpjBasico: row[0],
        razaoSocial: row[1],
        naturezaJuridica: row[2],
        qualificacaoResp: row[3],
        capitalSocial: parseFloat(row[4].replace(',', '.')) || 0,
        porteEmpresa: row[5],
        enteFederativo: row[6] || null
      };
    } catch (e) { return null; }
  }

  private mapEstabelecimento(row: any) {
    // 0:cnpj_basico, 1:cnpj_ordem, 2:cnpj_dv, 3:matriz_filial, 4:nome_fantasia, 5:situacao...
    try {
      return {
        cnpjBasico: row[0],
        cnpjOrdem: row[1],
        cnpjDv: row[2],
        identificadorMatriz: parseInt(row[3]) || 1,
        nomeFantasia: row[4] || null,
        situacaoCadastral: row[5],
        dataSituacao: row[6],
        motivoSituacao: row[7],
        nomeCidadeExterior: row[8],
        paisId: row[9],
        dataInicioAtividade: row[10],
        cnaeFiscalPrincipal: row[11],
        cnaeFiscalSecundaria: row[12],
        tipoLogradouro: row[13],
        logradouro: row[14],
        numero: row[15],
        complemento: row[16],
        bairro: row[17],
        cep: row[18],
        uf: row[19],
        municipio: row[20],
        ddd1: row[21],
        telefone1: row[22],
        ddd2: row[23],
        telefone2: row[24],
        dddFax: row[25],
        fax: row[26],
        email: row[27],
        situacaoEspecial: row[28],
        dataSituacaoEspecial: row[29]
      };
    } catch (e) { return null; }
  }

  private async saveBatch(type: string, batch: any[]) {
    if (type === 'EMPRESAS') {
      await this.prisma.cnpjEmpresa.createMany({
        data: batch,
        skipDuplicates: true
      });
    } else {
      await this.prisma.cnpjEstabelecimento.createMany({
        data: batch,
        skipDuplicates: true
      });
    }
  }

  async getStatus() {
    return this.prisma.importStatus.findMany({
      orderBy: { startedAt: 'desc' },
      take: 5
    });
  }
}

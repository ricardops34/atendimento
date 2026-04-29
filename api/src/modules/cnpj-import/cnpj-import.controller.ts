import { Controller, Post, Get, Body } from '@nestjs/common';
import { CnpjImportService } from './cnpj-import.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('CNPJ Import')
@Controller('cnpj/import')
export class CnpjImportController {
  constructor(private readonly importService: CnpjImportService) {}

  @Post('start')
  @ApiOperation({ summary: 'Inicia importação de dados da RFB' })
  async startImport(
    @Body() body: { type: 'EMPRESAS' | 'ESTABELECIMENTOS', folder: string, files: string[] }
  ) {
    return this.importService.startImport(body.type, body.folder, body.files);
  }

  @Get('status')
  @ApiOperation({ summary: 'Retorna o status das últimas importações' })
  async getStatus() {
    return this.importService.getStatus();
  }
}

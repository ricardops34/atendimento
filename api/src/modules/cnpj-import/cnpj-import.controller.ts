import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { CnpjImportService } from './cnpj-import.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('CNPJ Import')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('cnpj/import')
export class CnpjImportController {
  constructor(private readonly importService: CnpjImportService) {}

  @Post('start')
  @Roles('SUPER_ADMIN')
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

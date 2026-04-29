import { Controller, Get, Post, Query, Param, Body, UseGuards } from '@nestjs/common';
import { CnpjService } from './cnpj.service';
import { CnpjImportService } from './cnpj-import.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('cnpj')
@UseGuards(JwtAuthGuard)
export class CnpjController {
  constructor(
    private readonly cnpjService: CnpjService,
    private readonly importService: CnpjImportService
  ) {}

  @Get('empresas')
  async getEmpresas(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('filter') filter?: string
  ) {
    const skip = (page - 1) * pageSize;
    const { items, total } = await this.cnpjService.findAllEmpresas({ 
      skip: Number(skip), 
      take: Number(pageSize), 
      filter 
    });

    return {
      items,
      hasNext: total > page * pageSize
    };
  }

  @Get('estabelecimentos')
  async getEstabelecimentos(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('filter') filter?: string,
    @Query('situacao') situacao?: string,
    @Query('uf') uf?: string,
    @Query('municipio') municipio?: string,
    @Query('cnae') cnae?: string,
    @Query('cep') cep?: string
  ) {
    const p = Number(page) || 1;
    const ps = Number(pageSize) || 10;
    const skip = (p - 1) * ps;
    
    const { items, total } = await this.cnpjService.findAllEstabelecimentos({
      skip,
      take: ps,
      filter,
      situacao,
      uf,
      municipio,
      cnae,
      cep
    });

    return {
      items,
      hasNext: skip + items.length < total
    };
  }

  @Get('detalhes/:cnpjBasico')
  async getDetalhes(@Param('cnpjBasico') cnpjBasico: string) {
    return this.cnpjService.findOne(cnpjBasico);
  }

  @Post('import/empresas')
  async importEmpresas(@Body('path') path: string) {
    return this.importService.importEmpresas(path);
  }

  @Post('import/estabelecimentos')
  async importEstabelecimentos(@Body('path') path: string) {
    return this.importService.importEstabelecimentos(path);
  }

  @Post('import/auxiliary')
  async importAuxiliary(
    @Body('path') path: string,
    @Body('type') type: 'CNAE' | 'MUNIC' | 'PAIS' | 'NATU' | 'QUAL' | 'MOTI'
  ) {
    return this.importService.importAuxiliary(path, type);
  }
}

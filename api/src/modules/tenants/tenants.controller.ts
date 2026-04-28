import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Tenants (SaaS Admin)')
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova empresa (SaaS Admin)' })
  create(@Body() data: any) {
    return this.tenantsService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as empresas' })
  findAll() {
    return this.tenantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ver detalhes de uma empresa' })
  findOne(@Param('id') id: string) {
    return this.tenantsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados da empresa' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.tenantsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover empresa do sistema' })
  remove(@Param('id') id: string) {
    return this.tenantsService.remove(id);
  }
}

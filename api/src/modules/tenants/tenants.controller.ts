import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Tenants (SaaS Admin)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Criar nova empresa (SaaS Admin)' })
  create(@Body() data: any) {
    return this.tenantsService.create(data);
  }

  @Get()
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Listar todas as empresas' })
  findAll() {
    return this.tenantsService.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Ver detalhes de uma empresa' })
  findOne(@Param('id') id: string) {
    return this.tenantsService.findOne(id);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Atualizar dados da empresa' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.tenantsService.update(id, data);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Remover empresa do sistema' })
  remove(@Param('id') id: string) {
    return this.tenantsService.remove(id);
  }
}

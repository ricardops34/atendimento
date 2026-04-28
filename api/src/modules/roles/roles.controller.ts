import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { TenantId } from '../../common/decorators/tenant-id.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles as RoleDecorator } from '../../common/decorators/roles.decorator';

@ApiTags('Roles (Access Profiles)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar perfis de acesso' })
  findAll(@TenantId() tenantId: string) {
    return this.rolesService.findAll(tenantId);
  }

  @Post()
  @RoleDecorator('SUPER_ADMIN', 'ADMIN')
  @ApiOperation({ summary: 'Criar novo perfil' })
  create(@TenantId() tenantId: string, @Body() data: any) {
    return this.rolesService.create(tenantId, data);
  }

  @Patch(':id')
  @RoleDecorator('SUPER_ADMIN', 'ADMIN')
  @ApiOperation({ summary: 'Atualizar perfil' })
  update(@Param('id') id: string, @TenantId() tenantId: string, @Body() data: any) {
    return this.rolesService.update(id, tenantId, data);
  }

  @Delete(':id')
  @RoleDecorator('SUPER_ADMIN', 'ADMIN')
  @ApiOperation({ summary: 'Remover perfil' })
  remove(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.rolesService.remove(id, tenantId);
  }
}

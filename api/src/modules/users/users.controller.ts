import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { TenantId } from '../../common/decorators/tenant-id.decorator';

@ApiTags('Users (SaaS Admin)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('SUPER_ADMIN', 'ADMIN') // Admin do tenant também pode criar usuários
  @ApiOperation({ summary: 'Criar novo usuário' })
  create(@Body() data: any, @TenantId() tenantId: string) {
    return this.usersService.create({ ...data, tenantId });
  }

  @Get()
  @ApiOperation({ summary: 'Listar usuários da empresa' })
  findAll(@TenantId() tenantId: string) {
    return this.usersService.findAll(tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ver detalhes do usuário' })
  findOne(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.usersService.findOne(id, tenantId);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiOperation({ summary: 'Atualizar usuário' })
  update(@Param('id') id: string, @Body() data: any, @TenantId() tenantId: string) {
    return this.usersService.update(id, tenantId, data);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiOperation({ summary: 'Remover usuário' })
  remove(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.usersService.remove(id, tenantId);
  }
}

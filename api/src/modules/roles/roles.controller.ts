import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { TenantId } from '../../common/decorators/tenant-id.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  findAll(@TenantId() tenantId: string) {
    return this.rolesService.findAll(tenantId);
  }

  @Post()
  create(@TenantId() tenantId: string, @Body() data: any) {
    return this.rolesService.create(tenantId, data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @TenantId() tenantId: string, @Body() data: any) {
    return this.rolesService.update(id, tenantId, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.rolesService.remove(id, tenantId);
  }
}

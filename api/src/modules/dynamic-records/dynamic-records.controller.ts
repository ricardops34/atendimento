import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DynamicRecordsService } from './dynamic-records.service';
import { TenantId } from '../../common/decorators/tenant-id.decorator';

@Controller('dynamic')
export class DynamicRecordsController {
  constructor(private readonly dynamicRecordsService: DynamicRecordsService) {}

  @Get(':entity')
  findAll(@Param('entity') entity: string, @TenantId() tenantId: string) {
    return this.dynamicRecordsService.findAll(entity, tenantId);
  }

  @Post(':entity')
  create(
    @Param('entity') entity: string, 
    @TenantId() tenantId: string, 
    @Body() data: any
  ) {
    return this.dynamicRecordsService.create(entity, tenantId, data);
  }

  @Patch(':entity/:id')
  update(
    @Param('id') id: string, 
    @TenantId() tenantId: string, 
    @Body() data: any
  ) {
    return this.dynamicRecordsService.update(id, tenantId, data);
  }

  @Delete(':entity/:id')
  remove(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.dynamicRecordsService.remove(id, tenantId);
  }
}

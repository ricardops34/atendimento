import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { Prisma } from '@prisma/client';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  create(@Body() data: Prisma.TenantCreateInput) {
    return this.tenantsService.create(data);
  }

  @Get()
  findAll() {
    return this.tenantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.TenantUpdateInput) {
    return this.tenantsService.update(id, data);
  }
}

import { Controller, Get, Post, Put, Patch, Delete, Body, Param, UseInterceptors, UploadedFile, Headers } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TenantsService } from './tenants.service';
import { StorageService } from '../storage/storage.service';
import { Prisma } from '@prisma/client';

@Controller('tenants')
export class TenantsController {
  constructor(
    private readonly tenantsService: TenantsService,
    private readonly storageService: StorageService
  ) {}

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

  @Patch('logo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadLogo(
    @Headers('x-tenant-id') tenantId: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    const logoUrl = await this.storageService.saveLogo(tenantId, file);
    return this.tenantsService.update(tenantId, { logoUrl });
  }
}

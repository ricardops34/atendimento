import { Controller, Get, Post, Body, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { MetadataService } from './metadata.service';

@Controller('metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get(':entity')
  async getMetadata(
    @Param('entity') entity: string,
    @Headers('x-tenant-id') tenantId: string
  ) {
    if (!tenantId) throw new UnauthorizedException('Tenant ID missing');
    return this.metadataService.getEntityMetadata(entity.toUpperCase(), tenantId);
  }

  @Post(':entity')
  async saveMetadata(
    @Param('entity') entity: string,
    @Headers('x-tenant-id') tenantId: string,
    @Body() data: any
  ) {
    if (!tenantId) throw new UnauthorizedException('Tenant ID missing');
    return this.metadataService.saveMetadata(entity.toUpperCase(), tenantId, data);
  }
}

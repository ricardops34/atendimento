import { Controller, Get, Post, Body, Param, Headers } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Metadata & Discovery')
@Controller('metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get('ai-context')
  @ApiOperation({ summary: 'Portal de Auto-Descoberta para Agentes de IA' })
  async getAiContext(@Headers('x-tenant-id') tenantId: string) {
    return this.metadataService.getAiContext(tenantId || 'admin');
  }

  @Get(':entity')
  async getMetadata(
    @Param('entity') entity: string,
    @Headers('x-tenant-id') tenantId: string
  ) {
    return this.metadataService.getEntityMetadata(entity, tenantId || 'admin');
  }

  @Post(':entity')
  async saveMetadata(
    @Param('entity') entity: string,
    @Headers('x-tenant-id') tenantId: string,
    @Body() data: any
  ) {
    return this.metadataService.saveMetadata(entity, tenantId || 'admin', data);
  }
}

import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TenantId } from '../../common/decorators/tenant-id.decorator';

@ApiTags('Metadata & Discovery')
@ApiBearerAuth()
@Controller('metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get('ai-context')
  @ApiOperation({ summary: 'Portal de Auto-Descoberta para Agentes de IA' })
  async getAiContext(@TenantId() tenantId: string) {
    return this.metadataService.getAiContext(tenantId);
  }

  @Get(':entity')
  async getMetadata(
    @Param('entity') entity: string,
    @TenantId() tenantId: string
  ) {
    return this.metadataService.getEntityMetadata(entity, tenantId);
  }

  @Post(':entity')
  async saveMetadata(
    @Param('entity') entity: string,
    @TenantId() tenantId: string,
    @Body() data: any
  ) {
    return this.metadataService.saveMetadata(entity, tenantId, data);
  }
}

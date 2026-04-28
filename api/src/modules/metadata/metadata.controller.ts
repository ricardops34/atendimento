import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TenantId } from '../../common/decorators/tenant-id.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AuditService } from '../audit/audit.service';

@ApiTags('Metadata & Discovery')
@ApiBearerAuth()
@Controller('metadata')
export class MetadataController {
  constructor(
    private readonly metadataService: MetadataService,
    private readonly auditService: AuditService
  ) {}

  @Get('ai-context')
  @ApiOperation({ summary: 'Portal de Auto-Descoberta para Agentes de IA' })
  async getAiContext(@TenantId() tenantId: string) {
    return this.metadataService.getAiContext(tenantId);
  }

  @Get(':entity')
  async getMetadata(
    @Param('entity') entity: string,
    @TenantId() tenantId: string,
    @CurrentUser('level') userLevel: number
  ) {
    return this.metadataService.getEntityMetadata(entity, tenantId, userLevel || 1);
  }

  @Post(':entity')
  async saveMetadata(
    @Param('entity') entity: string,
    @TenantId() tenantId: string,
    @CurrentUser('id') userId: string,
    @Body() data: any,
    @Req() req: any
  ) {
    // 1. Salva a alteração
    const result = await this.metadataService.saveMetadata(entity, tenantId, data);

    // 2. Registra no Log de Auditoria
    await this.auditService.log({
      userId,
      tenantId,
      action: 'METADATA_UPDATE',
      entity: entity,
      details: { fields: data.fields },
      ipAddress: req.ip
    });

    return result;
  }
}

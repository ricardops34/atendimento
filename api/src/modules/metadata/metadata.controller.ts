import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TenantId } from '../../common/decorators/tenant-id.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AuditService } from '../audit/audit.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Metadata & Discovery')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('metadata')
export class MetadataController {
  constructor(
    private readonly metadataService: MetadataService,
    private readonly auditService: AuditService
  ) {}

  @Get('entities')
  @ApiOperation({ summary: 'Listar todas as entidades configuráveis (SaaS Admin)' })
  async listEntities(@TenantId() tenantId: string) {
    return this.metadataService.listEntities(tenantId);
  }

  @Get('ai-context')
  @ApiOperation({ summary: 'Portal de Auto-Descoberta para Agentes de IA' })
  async getAiContext(@TenantId() tenantId: string) {
    return this.metadataService.getAiContext(tenantId);
  }

  @Get(':entity')
  @ApiOperation({ summary: 'Obter metadados de uma entidade' })
  async getMetadata(
    @Param('entity') entity: string,
    @TenantId() tenantId: string,
    @CurrentUser('level') userLevel: number
  ) {
    return this.metadataService.getEntityMetadata(entity, tenantId, userLevel || 1);
  }

  @Post(':entity')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Salvar metadados de uma entidade' })
  async saveMetadata(
    @Param('entity') entity: string,
    @TenantId() tenantId: string,
    @CurrentUser('id') userId: string,
    @Body() data: any,
    @Req() req: any
  ) {
    const result = await this.metadataService.saveMetadata(entity, tenantId, data);

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

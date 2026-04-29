import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Routines & Access Control')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @Get('catalog')
  @Roles('ADMIN_SAAS')
  @ApiOperation({ summary: 'Listar catálogo global de rotinas (SaaS Admin)' })
  async getCatalog() {
    return this.routinesService.findAll();
  }

  @Get('tenant')
  @ApiOperation({ summary: 'Listar rotinas disponíveis para a empresa logada' })
  async getTenantRoutines(@Request() req: any) {
    return this.routinesService.findByTenant(req.user.tenantId);
  }

  @Post('access-control')
  @Roles('ADMIN', 'ADMIN_SAAS')
  @ApiOperation({ summary: 'Salvar regras de acesso granular' })
  async saveAccess(@Body() data: any, @Request() req: any) {
    return this.routinesService.saveAccessControl(req.user.tenantId, data);
  }

  @Post('seed')
  @Roles('ADMIN_SAAS')
  @ApiOperation({ summary: 'Sincronizar rotinas nativas do sistema' })
  async seed() {
    await this.routinesService.seedSystemRoutines();
    return { message: 'Rotinas do sistema sincronizadas com sucesso' };
  }
}

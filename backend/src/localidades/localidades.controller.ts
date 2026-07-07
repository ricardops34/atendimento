import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { LocalidadesService } from './localidades.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('localidades')
@UseGuards(JwtAuthGuard)
export class LocalidadesController {
  constructor(private readonly svc: LocalidadesService) {}

  @Get('estados')
  estados() {
    return this.svc.findEstados();
  }

  @Get('municipios')
  municipios(@Query('estadoId') estadoId?: string, @Query('sigla') sigla?: string, @Query('search') search?: string) {
    return this.svc.findMunicipios({ estadoId: estadoId ? Number(estadoId) : undefined, sigla, search });
  }
}

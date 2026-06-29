import { Controller, Get, Query } from '@nestjs/common';
import { LocalidadesService } from './localidades.service';

@Controller('localidades')
export class LocalidadesController {
  constructor(private readonly svc: LocalidadesService) {}

  @Get('paises')
  paises() {
    return this.svc.findPaises();
  }

  @Get('estados')
  estados(@Query('paisId') paisId?: string) {
    return this.svc.findEstados(paisId ? Number(paisId) : undefined);
  }

  @Get('municipios')
  municipios(@Query('estadoId') estadoId?: string, @Query('sigla') sigla?: string, @Query('search') search?: string) {
    return this.svc.findMunicipios({ estadoId: estadoId ? Number(estadoId) : undefined, sigla, search });
  }
}

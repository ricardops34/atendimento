import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { RealizadosService } from './realizados.service';
import { FecharLoteDto } from './dto/fechar-lote.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EmpresaGuard } from '../auth/guards/empresa.guard';

@UseGuards(JwtAuthGuard, EmpresaGuard)
@Controller('realizados')
export class RealizadosController {
  constructor(private readonly realizadosService: RealizadosService) {}

  @Post('fechar-lote')
  fecharLote(@Body() fecharLoteDto: FecharLoteDto, @Request() req: any) {
    return this.realizadosService.fecharLote(fecharLoteDto, req.empresaId as number);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.realizadosService.findAll(req.empresaId as number);
  }
}

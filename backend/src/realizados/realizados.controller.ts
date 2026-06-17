import { Controller, Post, Body, Get } from '@nestjs/common';
import { RealizadosService } from './realizados.service';
import { FecharLoteDto } from './dto/fechar-lote.dto';

@Controller('realizados')
export class RealizadosController {
  constructor(private readonly realizadosService: RealizadosService) {}

  @Post('fechar-lote')
  fecharLote(@Body() fecharLoteDto: FecharLoteDto) {
    return this.realizadosService.fecharLote(fecharLoteDto);
  }

  @Get()
  findAll() {
    return this.realizadosService.findAll();
  }
}

import { Controller, Get, Post, Body, Patch, Put, Param, Delete, ParseIntPipe, Query, Request } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';

@Controller('contratos')
export class ContratosController {
  constructor(private readonly contratosService: ContratosService) {}

  @Post()
  create(@Body() createContratoDto: CreateContratoDto, @Request() req: any) {
    return this.contratosService.create(createContratoDto, req.empresaId as number);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.contratosService.findAll(req.empresaId as number);
  }

  @Get('search')
  search(@Query() query: Record<string, string | undefined>, @Request() req: any) {
    return this.contratosService.search(query, req.empresaId as number);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.contratosService.findOne(id, req.empresaId as number);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateContratoDto: UpdateContratoDto, @Request() req: any) {
    return this.contratosService.update(id, updateContratoDto, req.empresaId as number);
  }

  @Put(':id')
  updatePut(@Param('id', ParseIntPipe) id: number, @Body() updateContratoDto: UpdateContratoDto, @Request() req: any) {
    return this.contratosService.update(id, updateContratoDto, req.empresaId as number);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.contratosService.remove(id, req.empresaId as number);
  }
}

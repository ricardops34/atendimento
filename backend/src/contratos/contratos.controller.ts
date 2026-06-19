import { Controller, Get, Post, Body, Patch, Put, Param, Delete, ParseIntPipe, Query, Request } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';

@Controller('contratos')
export class ContratosController {
  constructor(private readonly contratosService: ContratosService) {}

  @Post()
  create(@Body() createContratoDto: CreateContratoDto, @Request() req: any) {
    return this.contratosService.create(createContratoDto, req.tenantId as number);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.contratosService.findAll(req.tenantId as number);
  }

  @Get('search')
  search(@Query() query: Record<string, string | undefined>, @Request() req: any) {
    return this.contratosService.search(query, req.tenantId as number);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.contratosService.findOne(id, req.tenantId as number);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateContratoDto: UpdateContratoDto, @Request() req: any) {
    return this.contratosService.update(id, updateContratoDto, req.tenantId as number);
  }

  @Put(':id')
  updatePut(@Param('id', ParseIntPipe) id: number, @Body() updateContratoDto: UpdateContratoDto, @Request() req: any) {
    return this.contratosService.update(id, updateContratoDto, req.tenantId as number);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.contratosService.remove(id, req.tenantId as number);
  }
}

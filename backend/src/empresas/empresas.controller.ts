import { Controller, Get, Post, Body, Patch, Put, Param, Delete, ParseIntPipe, Query, Request } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Post()
  create(@Body() createEmpresaDto: CreateEmpresaDto, @Request() req: any) {
    return this.empresasService.create(createEmpresaDto, req.tenantId as number);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.empresasService.findAll(req.tenantId as number);
  }

  @Get('search')
  search(@Query() query: Record<string, string | undefined>, @Request() req: any) {
    return this.empresasService.search(query, req.tenantId as number);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.empresasService.findOne(id, req.tenantId as number);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEmpresaDto: UpdateEmpresaDto, @Request() req: any) {
    return this.empresasService.update(id, updateEmpresaDto, req.tenantId as number);
  }

  @Put(':id')
  updatePut(@Param('id', ParseIntPipe) id: number, @Body() updateEmpresaDto: UpdateEmpresaDto, @Request() req: any) {
    return this.empresasService.update(id, updateEmpresaDto, req.tenantId as number);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.empresasService.remove(id, req.tenantId as number);
  }
}

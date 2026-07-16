import { Controller, Get, Post, Body, Patch, Put, Param, Delete, ParseIntPipe, Query, Request } from '@nestjs/common';
import { ProfissionaisService } from './profissionais.service';
import { CreateProfissionalDto } from './dto/create-profissional.dto';
import { UpdateProfissionalDto } from './dto/update-profissional.dto';

@Controller('profissionais')
export class ProfissionaisController {
  constructor(private readonly profissionaisService: ProfissionaisService) {}

  @Post()
  create(@Body() createProfissionalDto: CreateProfissionalDto, @Request() req: any) {
    return this.profissionaisService.create(createProfissionalDto, req.empresaId as number);
  }

  @Get()
  findAll(@Query() query: Record<string, string | undefined>, @Request() req: any) {
    return this.profissionaisService.search(query, req.empresaId as number);
  }

  @Get('search')
  search(@Query() query: Record<string, string | undefined>, @Request() req: any) {
    return this.profissionaisService.search(query, req.empresaId as number);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.profissionaisService.findOne(id, req.empresaId as number);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProfissionalDto: UpdateProfissionalDto, @Request() req: any) {
    return this.profissionaisService.update(id, updateProfissionalDto, req.empresaId as number);
  }

  @Put(':id')
  updatePut(@Param('id', ParseIntPipe) id: number, @Body() updateProfissionalDto: UpdateProfissionalDto, @Request() req: any) {
    return this.profissionaisService.update(id, updateProfissionalDto, req.empresaId as number);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.profissionaisService.remove(id, req.empresaId as number);
  }
}

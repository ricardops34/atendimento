import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProfissionaisService } from './profissionais.service';
import { CreateProfissionalDto } from './dto/create-profissional.dto';
import { UpdateProfissionalDto } from './dto/update-profissional.dto';

@Controller('profissionais')
export class ProfissionaisController {
  constructor(private readonly profissionaisService: ProfissionaisService) {}

  @Post()
  create(@Body() createProfissionalDto: CreateProfissionalDto) {
    return this.profissionaisService.create(createProfissionalDto);
  }

  @Get()
  findAll() {
    return this.profissionaisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.profissionaisService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProfissionalDto: UpdateProfissionalDto) {
    return this.profissionaisService.update(id, updateProfissionalDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.profissionaisService.remove(id);
  }
}

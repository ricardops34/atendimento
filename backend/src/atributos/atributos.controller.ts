import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { AtributosService } from './atributos.service';
import { CreateAtributoDto } from './dto/create-atributo.dto';
import { UpdateAtributoDto } from './dto/update-atributo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MenuGuard } from '../auth/guards/menu.guard';
import { RequireMenu } from '../auth/decorators/require-menu.decorator';

@Controller('atributos')
@UseGuards(JwtAuthGuard, MenuGuard)
@RequireMenu('atributos-list')
export class AtributosController {
  constructor(private readonly atributosService: AtributosService) {}

  @Post()
  create(@Body() createAtributoDto: CreateAtributoDto, @Request() req: any) {
    const tenantId = req.user.tenantId;
    return this.atributosService.create(createAtributoDto, tenantId);
  }

  @Get('search')
  search(@Query() query: any, @Request() req: any) {
    const tenantId = req.user.tenantId;
    return this.atributosService.search(query, tenantId);
  }

  @Get()
  findAll(@Query('cadastro') cadastro: string, @Query('ativo') ativo: string, @Request() req: any) {
    const tenantId = req.user.tenantId;
    return this.atributosService.findAll(tenantId, cadastro, ativo !== undefined ? ativo === 'true' : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    const tenantId = req.user.tenantId;
    return this.atributosService.findOne(+id, tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAtributoDto: UpdateAtributoDto, @Request() req: any) {
    const tenantId = req.user.tenantId;
    return this.atributosService.update(+id, updateAtributoDto, tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    const tenantId = req.user.tenantId;
    return this.atributosService.remove(+id, tenantId);
  }
}

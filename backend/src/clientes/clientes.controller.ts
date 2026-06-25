import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, Request } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto, @Request() req: any) {
    return this.clientesService.create(createClienteDto, req.empresaId as number);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.clientesService.findAll(req.empresaId as number);
  }

  @Get('search')
  search(@Query() query: Record<string, string | undefined>, @Request() req: any) {
    return this.clientesService.search(query, req.empresaId as number);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.clientesService.findOne(id, req.empresaId as number);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateClienteDto: UpdateClienteDto, @Request() req: any) {
    return this.clientesService.update(id, updateClienteDto, req.empresaId as number);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.clientesService.remove(id, req.empresaId as number);
  }
}

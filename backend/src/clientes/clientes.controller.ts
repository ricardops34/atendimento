import { Controller, Get, Post, Body, Patch, Put, Param, Delete, ParseIntPipe, Query, Request } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly ClientesService: ClientesService) {}

  @Post()
  create(@Body() CreateClienteDto: CreateClienteDto, @Request() req: any) {
    return this.ClientesService.create(CreateClienteDto, req.empresaId as number);
  }

  @Get()
  findAll(@Query() query: Record<string, string | undefined>, @Request() req: any) {
    return this.ClientesService.search(query, req.empresaId as number);
  }

  @Get('search')
  search(@Query() query: Record<string, string | undefined>, @Request() req: any) {
    return this.ClientesService.search(query, req.empresaId as number);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.ClientesService.findOne(id, req.empresaId as number);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() UpdateClienteDto: UpdateClienteDto, @Request() req: any) {
    return this.ClientesService.update(id, UpdateClienteDto, req.empresaId as number);
  }

  @Put(':id')
  updatePut(@Param('id', ParseIntPipe) id: number, @Body() UpdateClienteDto: UpdateClienteDto, @Request() req: any) {
    return this.ClientesService.update(id, UpdateClienteDto, req.empresaId as number);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.ClientesService.remove(id, req.empresaId as number);
  }
}

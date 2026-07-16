import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { PaisesService } from './paises.service';
import { CreatePaisDto } from './dto/create-pais.dto';
import { UpdatePaisDto } from './dto/update-pais.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('paises')
export class PaisesController {
  constructor(private readonly paisesService: PaisesService) {}

  @Post()
  create(@Body() createPaisDto: CreatePaisDto) {
    return this.paisesService.create(createPaisDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.paisesService.search(query);
  }

  @Get('search')
  search(@Query() query: any) {
    return this.paisesService.search(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paisesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaisDto: UpdatePaisDto,
  ) {
    return this.paisesService.update(id, updatePaisDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paisesService.remove(id);
  }
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly service: ProfilesService) {}

  @Post()
  create(@Body() data: any) {
    return this.service.create(data);
  }

  @Get()
  findAll(@Query() query: Record<string, string | undefined>) {
    return this.service.search(query);
  }

  @Get('search')
  search(@Query() query: Record<string, string | undefined>) {
    return this.service.search(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

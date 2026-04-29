import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Branches')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Get()
  async findAll(@Request() req: any) {
    return this.branchesService.findAll(req.user.tenantId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: any) {
    return this.branchesService.findOne(id, req.user.tenantId);
  }

  @Post()
  async create(@Body() data: any, @Request() req: any) {
    return this.branchesService.create(data, req.user.tenantId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any, @Request() req: any) {
    return this.branchesService.update(id, data, req.user.tenantId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: any) {
    return this.branchesService.remove(id, req.user.tenantId);
  }
}

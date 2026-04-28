import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlansService } from './plans.service';
import { Prisma } from '@prisma/client';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Plans (SaaS Admin)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Criar novo plano' })
  create(@Body() data: Prisma.PlanCreateInput) {
    return this.plansService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar planos disponíveis' })
  findAll() {
    return this.plansService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ver detalhes do plano' })
  findOne(@Param('id') id: string) {
    return this.plansService.findOne(id);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Atualizar plano' })
  update(@Param('id') id: string, @Body() data: Prisma.PlanUpdateInput) {
    return this.plansService.update(id, data);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Remover plano' })
  remove(@Param('id') id: string) {
    return this.plansService.remove(id);
  }
}

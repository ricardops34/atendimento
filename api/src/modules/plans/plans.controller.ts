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
  constructor(
    private readonly plansService: PlansService,
    private readonly prisma: PrismaService
  ) {}

  @Post()
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Criar novo plano' })
  create(@Body() data: Prisma.PlanCreateInput) {
    return this.plansService.create(data);
  }

  @Get()
  @Roles('ADMIN_SAAS')
  @ApiOperation({ summary: 'Listar todos os planos' })
  async findAll() {
    return this.prisma.plan.findMany({
      include: {
        routines: {
          include: { routine: true }
        },
        _count: {
          select: { tenants: true }
        }
      }
    });
  }

  @Post('toggle-routine')
  @Roles('ADMIN_SAAS')
  @ApiOperation({ summary: 'Ativar/Desativar rotina em um plano' })
  async toggleRoutine(@Body() data: { planId: string, routineId: string }) {
    const exists = await this.prisma.planRoutine.findUnique({
      where: { planId_routineId: { planId: data.planId, routineId: data.routineId } }
    });

    if (exists) {
      await this.prisma.planRoutine.delete({
        where: { id: exists.id }
      });
      return { active: false };
    } else {
      await this.prisma.planRoutine.create({
        data: { planId: data.planId, routineId: data.routineId }
      });
      return { active: true };
    }
  }

  @Get(':id')
  @Roles('ADMIN_SAAS')
  @ApiOperation({ summary: 'Obter detalhes de um plano' })
  async findOne(@Param('id') id: string) {
    return this.plansService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN_SAAS')
  @ApiOperation({ summary: 'Atualizar um plano' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.plansService.update(id, data);
  }

  @Delete(':id')
  @Roles('ADMIN_SAAS')
  @ApiOperation({ summary: 'Remover um plano' })
  async remove(@Param('id') id: string) {
    return this.plansService.remove(id);
  }
}

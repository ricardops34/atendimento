import { Module } from '@nestjs/common';
import { AgendamentosController } from './agendamentos.controller';
import { AgendamentosService } from './agendamentos.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MenuGuard } from '../auth/guards/menu.guard';
import { ProfissionalScopeGuard } from '../auth/guards/profissional-scope.guard';
import { BancoHorasModule } from '../banco-horas/banco-horas.module';

@Module({
  imports: [PrismaModule, BancoHorasModule],
  controllers: [AgendamentosController],
  providers: [AgendamentosService, MenuGuard, ProfissionalScopeGuard],
  exports: [AgendamentosService],
})
export class AgendamentosModule {}

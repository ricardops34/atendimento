import { Module } from '@nestjs/common';
import { AgendamentosController } from './agendamentos.controller';
import { AgendamentosService } from './agendamentos.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ModuleGuard } from '../auth/guards/module.guard';

@Module({
  imports: [PrismaModule],
  controllers: [AgendamentosController],
  providers: [AgendamentosService, ModuleGuard],
})
export class AgendamentosModule {}

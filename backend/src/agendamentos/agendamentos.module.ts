import { Module } from '@nestjs/common';
import { AgendamentosController } from './agendamentos.controller';
import { AgendamentosService } from './agendamentos.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MenuGuard } from '../auth/guards/menu.guard';

@Module({
  imports: [PrismaModule],
  controllers: [AgendamentosController],
  providers: [AgendamentosService, MenuGuard],
  exports: [AgendamentosService],
})
export class AgendamentosModule {}

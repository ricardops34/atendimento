import { Module } from '@nestjs/common';
import { ContratosController } from './contratos.controller';
import { ContratosService } from './contratos.service';
import { MenuGuard } from '../auth/guards/menu.guard';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ContratosController],
  providers: [ContratosService, MenuGuard]
})
export class ContratosModule {}

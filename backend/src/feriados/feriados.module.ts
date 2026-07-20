import { Module } from '@nestjs/common';
import { FeriadosController } from './feriados.controller';
import { FeriadosService } from './feriados.service';
import { MenuGuard } from '../auth/guards/menu.guard';
import { PrismaModule } from '../prisma/prisma.module';
import { MenuGuard } from '../auth/guards/menu.guard';

@Module({
  imports: [PrismaModule],
  controllers: [FeriadosController],
  providers: [FeriadosService, MenuGuard]
})
export class FeriadosModule {}

import { Module } from '@nestjs/common';
import { BancoHorasController } from './banco-horas.controller';
import { BancoHorasService } from './banco-horas.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MenuGuard } from '../auth/guards/menu.guard';
import { ProfissionalScopeGuard } from '../auth/guards/profissional-scope.guard';

@Module({
  imports: [PrismaModule],
  controllers: [BancoHorasController],
  providers: [BancoHorasService, MenuGuard, ProfissionalScopeGuard],
  exports: [BancoHorasService],
})
export class BancoHorasModule {}

import { Module } from '@nestjs/common';
import { EstadosController } from './estados.controller';
import { EstadosService } from './estados.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MenuGuard } from '../auth/guards/menu.guard';

@Module({
  imports: [PrismaModule],
  controllers: [EstadosController],
  providers: [EstadosService, MenuGuard]
})
export class EstadosModule {}

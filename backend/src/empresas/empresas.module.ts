import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { EmpresasController } from './empresas.controller';
import { EmpresasService } from './empresas.service';
import { MenuGuard } from '../auth/guards/menu.guard';

@Module({
  imports: [PrismaModule],
  controllers: [EmpresasController],
  providers: [EmpresasService, MenuGuard],
})
export class EmpresasModule {}

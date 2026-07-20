import { Module } from '@nestjs/common';
import { PaisesService } from './paises.service';
import { PaisesController } from './paises.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MenuGuard } from '../auth/guards/menu.guard';

@Module({
  imports: [PrismaModule],
  controllers: [PaisesController],
  providers: [PaisesService, MenuGuard],
  exports: [PaisesService],
})
export class PaisesModule {}

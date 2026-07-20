import { Module } from '@nestjs/common';
import { AtributosController } from './atributos.controller';
import { AtributosService } from './atributos.service';
import { MenuGuard } from '../auth/guards/menu.guard';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AtributosController],
  providers: [AtributosService, MenuGuard]
})
export class AtributosModule {}

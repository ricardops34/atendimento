import { Module } from '@nestjs/common';
import { AtributosController } from './atributos.controller';
import { AtributosService } from './atributos.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MenuGuard } from '../auth/guards/menu.guard';

@Module({
  imports: [PrismaModule],
  controllers: [AtributosController],
  providers: [AtributosService, MenuGuard]
})
export class AtributosModule {}

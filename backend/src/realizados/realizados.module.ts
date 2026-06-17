import { Module } from '@nestjs/common';
import { RealizadosController } from './realizados.controller';
import { RealizadosService } from './realizados.service';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RealizadosController],
  providers: [RealizadosService]
})
export class RealizadosModule {}

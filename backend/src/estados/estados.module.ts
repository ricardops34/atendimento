import { Module } from '@nestjs/common';
import { EstadosController } from './estados.controller';
import { EstadosService } from './estados.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EstadosController],
  providers: [EstadosService]
})
export class EstadosModule {}

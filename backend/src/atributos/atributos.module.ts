import { Module } from '@nestjs/common';
import { AtributosController } from './atributos.controller';
import { AtributosService } from './atributos.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AtributosController],
  providers: [AtributosService]
})
export class AtributosModule {}

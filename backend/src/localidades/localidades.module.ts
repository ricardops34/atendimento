import { Module } from '@nestjs/common';
import { LocalidadesController } from './localidades.controller';
import { LocalidadesService } from './localidades.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LocalidadesController],
  providers: [LocalidadesService],
  exports: [LocalidadesService],
})
export class LocalidadesModule {}

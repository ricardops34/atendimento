import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RoutinesController } from './routines.controller';
import { RoutinesService } from './routines.service';
import { MenuGuard } from '../auth/guards/menu.guard';

@Module({
  imports: [PrismaModule],
  controllers: [RoutinesController],
  providers: [RoutinesService, MenuGuard],
})
export class RoutinesModule {}

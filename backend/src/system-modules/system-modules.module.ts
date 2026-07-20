import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SystemModulesController } from './system-modules.controller';
import { SystemModulesService } from './system-modules.service';
import { MenuGuard } from '../auth/guards/menu.guard';

@Module({
  imports: [PrismaModule],
  controllers: [SystemModulesController],
  providers: [SystemModulesService, MenuGuard],
})
export class SystemModulesModule {}

import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SystemModulesController } from './system-modules.controller';
import { SystemModulesService } from './system-modules.service';

@Module({
  imports: [PrismaModule],
  controllers: [SystemModulesController],
  providers: [SystemModulesService],
})
export class SystemModulesModule {}

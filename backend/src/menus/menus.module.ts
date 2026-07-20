import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { MenuGuard } from '../auth/guards/menu.guard';

@Module({
  imports: [PrismaModule],
  controllers: [MenusController],
  providers: [MenusService, MenuGuard],
})
export class MenusModule {}

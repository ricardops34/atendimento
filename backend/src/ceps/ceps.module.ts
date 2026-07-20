import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CepsController } from './ceps.controller';
import { CepsService } from './ceps.service';
import { MenuGuard } from '../auth/guards/menu.guard';

@Module({
  imports: [PrismaModule],
  controllers: [CepsController],
  providers: [CepsService, MenuGuard]
})
export class CepsModule {}

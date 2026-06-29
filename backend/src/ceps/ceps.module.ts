import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CepsController } from './ceps.controller';
import { CepsService } from './ceps.service';

@Module({
  imports: [PrismaModule],
  controllers: [CepsController],
  providers: [CepsService]
})
export class CepsModule {}

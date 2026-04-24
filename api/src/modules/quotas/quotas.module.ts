import { Module } from '@nestjs/common';
import { QuotasService } from './quotas.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    PrismaModule,
    RedisModule
  ],
  providers: [QuotasService],
  exports: [QuotasService]
})
export class QuotasModule {}

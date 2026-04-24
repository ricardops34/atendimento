import { Module } from '@nestjs/common';
import { QuotasService } from './quotas.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { IORedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    PrismaModule,
    // Importamos o IORedisModule para que o QuotasService possa usá-lo
    IORedisModule
  ],
  providers: [QuotasService],
  exports: [QuotasService]
})
export class QuotasModule {}

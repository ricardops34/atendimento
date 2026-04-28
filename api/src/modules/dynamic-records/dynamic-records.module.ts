import { Module } from '@nestjs/common';
import { DynamicRecordsService } from './dynamic-records.service';
import { DynamicRecordsController } from './dynamic-records.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DynamicRecordsController],
  providers: [DynamicRecordsService],
  exports: [DynamicRecordsService],
})
export class DynamicRecordsModule {}

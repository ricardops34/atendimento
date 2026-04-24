import { Module } from '@nestjs/common';
import { QuotasService } from './quotas.service';

@Module({
  providers: [QuotasService]
})
export class QuotasModule {}

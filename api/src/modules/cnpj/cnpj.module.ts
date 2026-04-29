import { Module } from '@nestjs/common';
import { CnpjService } from './cnpj.service';
import { CnpjImportService } from './cnpj-import.service';
import { CnpjController } from './cnpj.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CnpjController],
  providers: [CnpjService, CnpjImportService],
  exports: [CnpjService, CnpjImportService]
})
export class CnpjModule {}

import { Module } from '@nestjs/common';
import { CnpjImportService } from './cnpj-import.service';
import { CnpjImportController } from './cnpj-import.controller';

@Module({
  controllers: [CnpjImportController],
  providers: [CnpjImportService],
  exports: [CnpjImportService],
})
export class CnpjImportModule {}

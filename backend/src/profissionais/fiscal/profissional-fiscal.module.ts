import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ProfissionalFiscalController } from './profissional-fiscal.controller';
import { ProfissionalFiscalService } from './profissional-fiscal.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProfissionalFiscalController],
  providers: [ProfissionalFiscalService],
  exports: [ProfissionalFiscalService],
})
export class ProfissionalFiscalModule {}

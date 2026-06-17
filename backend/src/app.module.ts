import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmpresasModule } from './empresas/empresas.module';
import { ProfissionaisModule } from './profissionais/profissionais.module';
import { ContratosModule } from './contratos/contratos.module';
import { AgendamentosModule } from './agendamentos/agendamentos.module';

@Module({
  imports: [PrismaModule, EmpresasModule, ProfissionaisModule, ContratosModule, AgendamentosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

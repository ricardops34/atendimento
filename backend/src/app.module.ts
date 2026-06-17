import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EmpresasModule } from './empresas/empresas.module';
import { ProfissionaisModule } from './profissionais/profissionais.module';
import { ContratosModule } from './contratos/contratos.module';
import { AgendamentosModule } from './agendamentos/agendamentos.module';
import { RealizadosModule } from './realizados/realizados.module';

@Module({
  imports: [
    PrismaModule, 
    AuthModule,
    EmpresasModule, 
    ProfissionaisModule, 
    ContratosModule, 
    AgendamentosModule, 
    RealizadosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

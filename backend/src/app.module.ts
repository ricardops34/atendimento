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
import { TenantsModule } from './tenants/tenants.module';
import { SystemModulesModule } from './system-modules/system-modules.module';
import { RoutinesModule } from './routines/routines.module';
import { MenusModule } from './menus/menus.module';
import { ProfilesModule } from './profiles/profiles.module';
import { UsersModule } from './users/users.module';
import { FeriadosModule } from './feriados/feriados.module';

@Module({
  imports: [
    PrismaModule, 
    AuthModule,
    EmpresasModule, 
    ProfissionaisModule, 
    ContratosModule, 
    AgendamentosModule, 
    RealizadosModule,
    TenantsModule,
    SystemModulesModule,
    RoutinesModule,
    MenusModule,
    ProfilesModule,
    UsersModule,
    FeriadosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

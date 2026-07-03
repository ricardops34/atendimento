import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProfissionaisModule } from './profissionais/profissionais.module';
import { ContratosModule } from './contratos/contratos.module';
import { AgendamentosModule } from './agendamentos/agendamentos.module';
import { RealizadosModule } from './realizados/realizados.module';
import { EmpresasModule } from './empresas/empresas.module';
import { SystemModulesModule } from './system-modules/system-modules.module';
import { RoutinesModule } from './routines/routines.module';
import { MenusModule } from './menus/menus.module';
import { ProfilesModule } from './profiles/profiles.module';
import { UsersModule } from './users/users.module';
import { FeriadosModule } from './feriados/feriados.module';
import { EstadosModule } from './estados/estados.module';
import { MunicipiosModule } from './municipios/municipios.module';
import { CepsModule } from './ceps/ceps.module';

@Module({
  imports: [
    PrismaModule, 
    AuthModule,
    ClientesModule, 
    ProfissionaisModule, 
    ContratosModule, 
    AgendamentosModule, 
    RealizadosModule,
    EmpresasModule,
    SystemModulesModule,
    RoutinesModule,
    MenusModule,
    ProfilesModule,
    UsersModule,
    FeriadosModule,
    EstadosModule,
    MunicipiosModule,
    CepsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { PortalClienteController } from './portal-cliente.controller';
import { PortalClienteService } from './portal-cliente.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AgendamentosModule } from '../agendamentos/agendamentos.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AgendamentosModule, AuthModule],
  controllers: [PortalClienteController],
  providers: [PortalClienteService],
})
export class PortalClienteModule {}

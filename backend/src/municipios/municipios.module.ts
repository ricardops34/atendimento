import { Module } from '@nestjs/common';
import { MunicipiosController } from './municipios.controller';
import { MunicipiosService } from './municipios.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MenuGuard } from '../auth/guards/menu.guard';

@Module({
  imports: [PrismaModule],
  controllers: [MunicipiosController],
  providers: [MunicipiosService, MenuGuard]
})
export class MunicipiosModule {}

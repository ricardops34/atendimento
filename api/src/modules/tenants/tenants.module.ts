import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { StorageModule } from '../storage/storage.module';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';

@Module({
  imports: [PrismaModule, StorageModule],
  controllers: [TenantsController],
  providers: [TenantsService],
})
export class TenantsModule {}

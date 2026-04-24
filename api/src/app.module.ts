import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { MetadataModule } from './modules/metadata/metadata.module';
import { MenuModule } from './modules/menu/menu.module';
import { AuditModule } from './modules/audit/audit.module';
import { QuotasModule } from './modules/quotas/quotas.module';
import { StorageModule } from './modules/storage/storage.module';
import { BranchesModule } from './modules/branches/branches.module';
import { PublicModule } from './modules/public/public.module';
import { PlansModule } from './modules/plans/plans.module';

@Module({
  imports: [UsersModule, AuthModule, PrismaModule, TenantsModule, MetadataModule, MenuModule, AuditModule, QuotasModule, StorageModule, BranchesModule, PublicModule, PlansModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

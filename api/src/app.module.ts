import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
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
import { CustomRoutinesModule } from './modules/custom-routines/custom-routines.module';
import { DynamicRecordsModule } from './modules/dynamic-records/dynamic-records.module';
import { RolesModule } from './modules/roles/roles.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { TenantInterceptor } from './common/interceptors/tenant.interceptor';

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',
      url: process.env.REDIS_URL || 'redis://redis:6379',
    }),
    UsersModule, 
    AuthModule, 
    PrismaModule, 
    TenantsModule, 
    MetadataModule, 
    MenuModule, 
    AuditModule, 
    QuotasModule, 
    StorageModule, 
    BranchesModule, 
    PublicModule, 
    PlansModule, 
    CustomRoutinesModule,
    DynamicRecordsModule,
    RolesModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TenantInterceptor,
    },
  ],
})
export class AppModule {}

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

@Module({
  imports: [UsersModule, AuthModule, PrismaModule, TenantsModule, MetadataModule, MenuModule, AuditModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

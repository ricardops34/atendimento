import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { MetadataModule } from './modules/metadata/metadata.module';
import { MenuModule } from './modules/menu/menu.module';

@Module({
  imports: [UsersModule, AuthModule, PrismaModule, TenantsModule, MetadataModule, MenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

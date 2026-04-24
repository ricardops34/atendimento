import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TenantsModule } from './modules/tenants/tenants.module';

@Module({
  imports: [UsersModule, AuthModule, PrismaModule, TenantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

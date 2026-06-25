import { Module } from '@nestjs/common';
import { CepsController } from './ceps.controller';
import { CepsService } from './ceps.service';

@Module({
  controllers: [CepsController],
  providers: [CepsService]
})
export class CepsModule {}

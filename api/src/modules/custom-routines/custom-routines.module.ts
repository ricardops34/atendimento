import { Module } from '@nestjs/common';
import { CustomRoutinesService } from './custom-routines.service';

@Module({
  providers: [CustomRoutinesService]
})
export class CustomRoutinesModule {}

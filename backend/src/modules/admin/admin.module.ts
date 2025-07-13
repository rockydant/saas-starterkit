import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AdminController],
  providers: [],
  exports: [],
})
export class AdminModule {} 
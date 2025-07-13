import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Tenant } from '@/modules/tenants/entities/tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tenant])],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {} 
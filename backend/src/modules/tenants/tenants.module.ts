import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantsController } from './tenants.controller';
import { TenantService } from './tenant.service';
import { Tenant } from './entities/tenant.entity';
import { User } from '../users/entities/user.entity';
import { Subscription } from '../billing/entities/subscription.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, User, Subscription]), AuthModule],
  controllers: [TenantsController],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantsModule {} 
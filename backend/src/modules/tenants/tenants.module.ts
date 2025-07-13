import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantsController } from './tenants.controller';
import { TenantService } from './tenant.service';
import { Tenant } from './entities/tenant.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Subscription } from '@/modules/billing/entities/subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, User, Subscription])],
  controllers: [TenantsController],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantsModule {} 
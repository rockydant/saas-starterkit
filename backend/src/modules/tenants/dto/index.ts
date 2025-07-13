import { IsString, IsOptional, IsEnum, IsNumber, IsDateString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TenantStatus, TenantPlan } from '../entities/tenant.entity';

export class CreateTenantDto {
  @ApiProperty({ description: 'Tenant name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Tenant subdomain' })
  @IsString()
  subdomain: string;

  @ApiProperty({ description: 'Tenant domain (optional)' })
  @IsOptional()
  @IsString()
  domain?: string;

  @ApiProperty({ description: 'Tenant description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Tenant plan', enum: TenantPlan })
  @IsOptional()
  @IsEnum(TenantPlan)
  plan?: TenantPlan;

  @ApiProperty({ description: 'Maximum number of users' })
  @IsOptional()
  @IsNumber()
  maxUsers?: number;

  @ApiProperty({ description: 'Maximum storage in MB' })
  @IsOptional()
  @IsNumber()
  maxStorage?: number;

  @ApiProperty({ description: 'Trial end date' })
  @IsOptional()
  @IsDateString()
  trialEndsAt?: string;

  @ApiProperty({ description: 'Tenant settings' })
  @IsOptional()
  @IsObject()
  settings?: Record<string, any>;

  @ApiProperty({ description: 'Tenant features' })
  @IsOptional()
  @IsObject()
  features?: Record<string, any>;
}

export class UpdateTenantDto {
  @ApiProperty({ description: 'Tenant name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Tenant subdomain' })
  @IsOptional()
  @IsString()
  subdomain?: string;

  @ApiProperty({ description: 'Tenant domain' })
  @IsOptional()
  @IsString()
  domain?: string;

  @ApiProperty({ description: 'Tenant description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Tenant plan', enum: TenantPlan })
  @IsOptional()
  @IsEnum(TenantPlan)
  plan?: TenantPlan;

  @ApiProperty({ description: 'Maximum number of users' })
  @IsOptional()
  @IsNumber()
  maxUsers?: number;

  @ApiProperty({ description: 'Maximum storage in MB' })
  @IsOptional()
  @IsNumber()
  maxStorage?: number;

  @ApiProperty({ description: 'Trial end date' })
  @IsOptional()
  @IsDateString()
  trialEndsAt?: string;

  @ApiProperty({ description: 'Subscription end date' })
  @IsOptional()
  @IsDateString()
  subscriptionEndsAt?: string;

  @ApiProperty({ description: 'Tenant settings' })
  @IsOptional()
  @IsObject()
  settings?: Record<string, any>;

  @ApiProperty({ description: 'Tenant features' })
  @IsOptional()
  @IsObject()
  features?: Record<string, any>;
}

export class TenantStatusDto {
  @ApiProperty({ description: 'Tenant status', enum: TenantStatus })
  @IsEnum(TenantStatus)
  status: TenantStatus;
}

export class TenantPlanDto {
  @ApiProperty({ description: 'Tenant plan', enum: TenantPlan })
  @IsEnum(TenantPlan)
  plan: TenantPlan;
} 
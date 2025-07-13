import { IsString, IsOptional, IsEnum, IsNumber, IsDateString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SubscriptionStatus, BillingCycle } from '../entities/subscription.entity';

export class CreateSubscriptionDto {
  @ApiProperty({ description: 'Subscription name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Subscription description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Subscription status', enum: SubscriptionStatus })
  @IsOptional()
  @IsEnum(SubscriptionStatus)
  status?: SubscriptionStatus;

  @ApiProperty({ description: 'Billing cycle', enum: BillingCycle })
  @IsOptional()
  @IsEnum(BillingCycle)
  billingCycle?: BillingCycle;

  @ApiProperty({ description: 'Subscription amount' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Tenant ID' })
  @IsString()
  tenantId: string;

  @ApiProperty({ description: 'Stripe subscription ID' })
  @IsOptional()
  @IsString()
  stripeSubscriptionId?: string;

  @ApiProperty({ description: 'Stripe price ID' })
  @IsOptional()
  @IsString()
  stripePriceId?: string;

  @ApiProperty({ description: 'Current period start date' })
  @IsOptional()
  @IsDateString()
  currentPeriodStart?: string;

  @ApiProperty({ description: 'Current period end date' })
  @IsOptional()
  @IsDateString()
  currentPeriodEnd?: string;

  @ApiProperty({ description: 'Trial start date' })
  @IsOptional()
  @IsDateString()
  trialStart?: string;

  @ApiProperty({ description: 'Trial end date' })
  @IsOptional()
  @IsDateString()
  trialEnd?: string;

  @ApiProperty({ description: 'Subscription metadata' })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class UpdateSubscriptionDto {
  @ApiProperty({ description: 'Subscription name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Subscription description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Subscription status', enum: SubscriptionStatus })
  @IsOptional()
  @IsEnum(SubscriptionStatus)
  status?: SubscriptionStatus;

  @ApiProperty({ description: 'Billing cycle', enum: BillingCycle })
  @IsOptional()
  @IsEnum(BillingCycle)
  billingCycle?: BillingCycle;

  @ApiProperty({ description: 'Subscription amount' })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({ description: 'Current period start date' })
  @IsOptional()
  @IsDateString()
  currentPeriodStart?: string;

  @ApiProperty({ description: 'Current period end date' })
  @IsOptional()
  @IsDateString()
  currentPeriodEnd?: string;

  @ApiProperty({ description: 'Trial start date' })
  @IsOptional()
  @IsDateString()
  trialStart?: string;

  @ApiProperty({ description: 'Trial end date' })
  @IsOptional()
  @IsDateString()
  trialEnd?: string;

  @ApiProperty({ description: 'Subscription metadata' })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class SubscriptionStatusDto {
  @ApiProperty({ description: 'Subscription status', enum: SubscriptionStatus })
  @IsEnum(SubscriptionStatus)
  status: SubscriptionStatus;
} 
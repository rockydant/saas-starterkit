import { Entity, Column, OneToMany, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Subscription } from '../../billing/entities/subscription.entity';

export enum TenantStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  CANCELLED = 'cancelled',
  PENDING = 'pending',
}

export enum TenantPlan {
  FREE = 'free',
  BASIC = 'basic',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise',
}

@Entity('tenants')
@Index(['subdomain'], { unique: true })
export class Tenant extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  subdomain: string;

  @Column({ nullable: true })
  domain?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: TenantStatus,
    default: TenantStatus.PENDING,
  })
  status: TenantStatus;

  @Column({
    type: 'enum',
    enum: TenantPlan,
    default: TenantPlan.FREE,
  })
  plan: TenantPlan;

  @Column({ nullable: true })
  stripeCustomerId?: string;

  @Column({ nullable: true })
  stripeSubscriptionId?: string;

  @Column({ type: 'jsonb', nullable: true })
  settings: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  features: Record<string, any>;

  @Column({ nullable: true })
  maxUsers?: number;

  @Column({ nullable: true })
  maxStorage?: number; // in MB

  @Column({ type: 'timestamp', nullable: true })
  trialEndsAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  subscriptionEndsAt?: Date;

  @OneToMany(() => User, (user) => user.tenant)
  users: User[];

  @OneToMany(() => Subscription, (subscription) => subscription.tenant)
  subscriptions: Subscription[];
} 
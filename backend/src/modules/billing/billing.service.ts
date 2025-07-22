import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription, SubscriptionStatus, BillingCycle } from './entities/subscription.entity';
import { Tenant } from '../tenants/entities/tenant.entity';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from './dto';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async findAllSubscriptions(query: any = {}) {
    const { page = 1, limit = 10, status, billingCycle, tenantId, search } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.subscriptionRepository.createQueryBuilder('subscription')
      .leftJoinAndSelect('subscription.tenant', 'tenant');

    if (status) {
      queryBuilder.andWhere('subscription.status = :status', { status });
    }

    if (billingCycle) {
      queryBuilder.andWhere('subscription.billingCycle = :billingCycle', { billingCycle });
    }

    if (tenantId) {
      queryBuilder.andWhere('subscription.tenantId = :tenantId', { tenantId });
    }

    if (search) {
      queryBuilder.andWhere(
        '(subscription.name ILIKE :search OR subscription.description ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    const [subscriptions, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy('subscription.createdAt', 'DESC')
      .getManyAndCount();

    return {
      subscriptions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOneSubscription(id: string) {
    return this.subscriptionRepository.findOne({
      where: { id },
      relations: ['tenant'],
    });
  }

  async createSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    // Verify tenant exists
    const tenant = await this.tenantRepository.findOne({
      where: { id: createSubscriptionDto.tenantId },
    });

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    const subscription = this.subscriptionRepository.create({
      ...createSubscriptionDto,
      status: createSubscriptionDto.status || SubscriptionStatus.TRIAL,
      billingCycle: createSubscriptionDto.billingCycle || BillingCycle.MONTHLY,
    });

    return this.subscriptionRepository.save(subscription);
  }

  async updateSubscription(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
    const subscription = await this.findOneSubscription(id);
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    Object.assign(subscription, updateSubscriptionDto);
    return this.subscriptionRepository.save(subscription);
  }

  async cancelSubscription(id: string) {
    const subscription = await this.findOneSubscription(id);
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    subscription.status = SubscriptionStatus.CANCELLED;
    subscription.cancelledAt = new Date();
    subscription.endedAt = new Date();

    return this.subscriptionRepository.save(subscription);
  }

  async updateSubscriptionStatus(id: string, status: SubscriptionStatus) {
    const subscription = await this.findOneSubscription(id);
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    subscription.status = status;
    return this.subscriptionRepository.save(subscription);
  }

  async getTenantSubscriptions(tenantId: string) {
    const tenant = await this.tenantRepository.findOne({
      where: { id: tenantId },
    });

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return this.subscriptionRepository.find({
      where: { tenantId },
      order: { createdAt: 'DESC' },
    });
  }

  async getBillingStats() {
    const totalSubscriptions = await this.subscriptionRepository.count();
    const activeSubscriptions = await this.subscriptionRepository.count({
      where: { status: SubscriptionStatus.ACTIVE },
    });
    const cancelledSubscriptions = await this.subscriptionRepository.count({
      where: { status: SubscriptionStatus.CANCELLED },
    });

    const statusStats = await this.subscriptionRepository
      .createQueryBuilder('subscription')
      .select('subscription.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('subscription.status')
      .getRawMany();

    const billingCycleStats = await this.subscriptionRepository
      .createQueryBuilder('subscription')
      .select('subscription.billingCycle', 'billingCycle')
      .addSelect('COUNT(*)', 'count')
      .groupBy('subscription.billingCycle')
      .getRawMany();

    const totalRevenue = await this.subscriptionRepository
      .createQueryBuilder('subscription')
      .select('SUM(subscription.amount)', 'total')
      .where('subscription.status = :status', { status: SubscriptionStatus.ACTIVE })
      .getRawOne();

    const recentSubscriptions = await this.subscriptionRepository.find({
      order: { createdAt: 'DESC' },
      take: 5,
      relations: ['tenant'],
    });

    return {
      total: totalSubscriptions,
      active: activeSubscriptions,
      cancelled: cancelledSubscriptions,
      statusStats,
      billingCycleStats,
      totalRevenue: parseFloat(totalRevenue?.total || '0'),
      recentSubscriptions,
    };
  }

  async getMonthlyRevenue() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const monthlyData = await this.subscriptionRepository
      .createQueryBuilder('subscription')
      .select('EXTRACT(MONTH FROM subscription.createdAt)', 'month')
      .addSelect('SUM(subscription.amount)', 'revenue')
      .where('subscription.status = :status', { status: SubscriptionStatus.ACTIVE })
      .andWhere('EXTRACT(YEAR FROM subscription.createdAt) = :year', { year: currentYear })
      .groupBy('EXTRACT(MONTH FROM subscription.createdAt)')
      .orderBy('month', 'ASC')
      .getRawMany();

    return {
      year: currentYear,
      monthlyData,
    };
  }

  async getYearlyRevenue() {
    const yearlyData = await this.subscriptionRepository
      .createQueryBuilder('subscription')
      .select('EXTRACT(YEAR FROM subscription.createdAt)', 'year')
      .addSelect('SUM(subscription.amount)', 'revenue')
      .where('subscription.status = :status', { status: SubscriptionStatus.ACTIVE })
      .groupBy('EXTRACT(YEAR FROM subscription.createdAt)')
      .orderBy('year', 'ASC')
      .getRawMany();

    return yearlyData;
  }

  async getPlans() {
    return [
      {
        id: 'free',
        name: 'Free',
        price: 0,
        features: [
          'Up to 5 users',
          '100MB storage',
          'Basic support',
        ],
        limits: {
          users: 5,
          storage: 100, // MB
        },
      },
      {
        id: 'basic',
        name: 'Basic',
        price: 29,
        features: [
          'Up to 25 users',
          '1GB storage',
          'Email support',
          'Advanced features',
        ],
        limits: {
          users: 25,
          storage: 1024, // MB
        },
      },
      {
        id: 'professional',
        name: 'Professional',
        price: 99,
        features: [
          'Up to 100 users',
          '10GB storage',
          'Priority support',
          'Advanced analytics',
          'Custom integrations',
        ],
        limits: {
          users: 100,
          storage: 10240, // MB
        },
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 299,
        features: [
          'Up to 1000 users',
          '100GB storage',
          '24/7 support',
          'Custom features',
          'Dedicated account manager',
        ],
        limits: {
          users: 1000,
          storage: 102400, // MB
        },
      },
    ];
  }

  async handleStripeWebhook(payload: any) {
    // This would handle Stripe webhook events
    // For now, return a placeholder
    return { message: 'Webhook processed successfully' };
  }
} 
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant, TenantStatus, TenantPlan } from './entities/tenant.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Subscription } from '@/modules/billing/entities/subscription.entity';
import { CreateTenantDto, UpdateTenantDto } from './dto';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  async findAll(query: any = {}) {
    const { page = 1, limit = 10, status, plan, search } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.tenantRepository.createQueryBuilder('tenant')
      .leftJoinAndSelect('tenant.users', 'users')
      .leftJoinAndSelect('tenant.subscriptions', 'subscriptions');

    if (status) {
      queryBuilder.andWhere('tenant.status = :status', { status });
    }

    if (plan) {
      queryBuilder.andWhere('tenant.plan = :plan', { plan });
    }

    if (search) {
      queryBuilder.andWhere(
        '(tenant.name ILIKE :search OR tenant.subdomain ILIKE :search OR tenant.domain ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    const [tenants, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy('tenant.createdAt', 'DESC')
      .getManyAndCount();

    return {
      tenants,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    return this.tenantRepository.findOne({
      where: { id },
      relations: ['users', 'subscriptions'],
    });
  }

  async create(createTenantDto: CreateTenantDto) {
    // Check if subdomain already exists
    const existingTenant = await this.tenantRepository.findOne({
      where: { subdomain: createTenantDto.subdomain },
    });

    if (existingTenant) {
      throw new ConflictException('Subdomain already exists');
    }

    const tenant = this.tenantRepository.create({
      ...createTenantDto,
      status: TenantStatus.PENDING,
      plan: createTenantDto.plan || TenantPlan.FREE,
    });

    return this.tenantRepository.save(tenant);
  }

  async update(id: string, updateTenantDto: UpdateTenantDto) {
    const tenant = await this.findOne(id);
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    // Check if subdomain is being changed and if it already exists
    if (updateTenantDto.subdomain && updateTenantDto.subdomain !== tenant.subdomain) {
      const existingTenant = await this.tenantRepository.findOne({
        where: { subdomain: updateTenantDto.subdomain },
      });

      if (existingTenant) {
        throw new ConflictException('Subdomain already exists');
      }
    }

    Object.assign(tenant, updateTenantDto);
    return this.tenantRepository.save(tenant);
  }

  async remove(id: string) {
    const tenant = await this.findOne(id);
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    // Check if tenant has active users
    const userCount = await this.userRepository.count({
      where: { tenantId: id },
    });

    if (userCount > 0) {
      throw new ConflictException('Cannot delete tenant with active users');
    }

    await this.tenantRepository.remove(tenant);
    return { message: 'Tenant deleted successfully' };
  }

  async updateStatus(id: string, status: TenantStatus) {
    const tenant = await this.findOne(id);
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    tenant.status = status;
    return this.tenantRepository.save(tenant);
  }

  async updatePlan(id: string, plan: TenantPlan) {
    const tenant = await this.findOne(id);
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    tenant.plan = plan;
    
    // Update limits based on plan
    switch (plan) {
      case TenantPlan.FREE:
        tenant.maxUsers = 5;
        tenant.maxStorage = 100; // 100MB
        break;
      case TenantPlan.BASIC:
        tenant.maxUsers = 25;
        tenant.maxStorage = 1024; // 1GB
        break;
      case TenantPlan.PROFESSIONAL:
        tenant.maxUsers = 100;
        tenant.maxStorage = 10240; // 10GB
        break;
      case TenantPlan.ENTERPRISE:
        tenant.maxUsers = 1000;
        tenant.maxStorage = 102400; // 100GB
        break;
    }

    return this.tenantRepository.save(tenant);
  }

  async getTenantUsers(id: string) {
    const tenant = await this.findOne(id);
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return this.userRepository.find({
      where: { tenantId: id },
      order: { createdAt: 'DESC' },
    });
  }

  async getTenantSubscriptions(id: string) {
    const tenant = await this.findOne(id);
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return this.subscriptionRepository.find({
      where: { tenantId: id },
      order: { createdAt: 'DESC' },
    });
  }

  async getTenantStats() {
    const totalTenants = await this.tenantRepository.count();
    const activeTenants = await this.tenantRepository.count({
      where: { status: TenantStatus.ACTIVE },
    });
    const suspendedTenants = await this.tenantRepository.count({
      where: { status: TenantStatus.SUSPENDED },
    });

    const planStats = await this.tenantRepository
      .createQueryBuilder('tenant')
      .select('tenant.plan', 'plan')
      .addSelect('COUNT(*)', 'count')
      .groupBy('tenant.plan')
      .getRawMany();

    const recentTenants = await this.tenantRepository.find({
      order: { createdAt: 'DESC' },
      take: 5,
    });

    return {
      total: totalTenants,
      active: activeTenants,
      suspended: suspendedTenants,
      planStats,
      recentTenants,
    };
  }

  async getTenantBySubdomain(subdomain: string) {
    return this.tenantRepository.findOne({
      where: { subdomain },
      relations: ['users'],
    });
  }
} 
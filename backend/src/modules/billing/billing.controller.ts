import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  UseGuards,
  HttpStatus,
  HttpException
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BillingService } from './billing.service';
import { CreateSubscriptionDto, UpdateSubscriptionDto, SubscriptionStatusDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Billing')
@Controller('billing')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('subscriptions')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all subscriptions' })
  @ApiResponse({ status: 200, description: 'List of all subscriptions' })
  async findAllSubscriptions(@Query() query: any) {
    return this.billingService.findAllSubscriptions(query);
  }

  @Get('subscriptions/:id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get subscription by ID' })
  @ApiResponse({ status: 200, description: 'Subscription details' })
  async findOneSubscription(@Param('id') id: string) {
    const subscription = await this.billingService.findOneSubscription(id);
    if (!subscription) {
      throw new HttpException('Subscription not found', HttpStatus.NOT_FOUND);
    }
    return subscription;
  }

  @Post('subscriptions')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create new subscription' })
  @ApiResponse({ status: 201, description: 'Subscription created successfully' })
  async createSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.billingService.createSubscription(createSubscriptionDto);
  }

  @Put('subscriptions/:id')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Update subscription' })
  @ApiResponse({ status: 200, description: 'Subscription updated successfully' })
  async updateSubscription(@Param('id') id: string, @Body() updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.billingService.updateSubscription(id, updateSubscriptionDto);
  }

  @Delete('subscriptions/:id')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Cancel subscription' })
  @ApiResponse({ status: 200, description: 'Subscription cancelled successfully' })
  async cancelSubscription(@Param('id') id: string) {
    return this.billingService.cancelSubscription(id);
  }

  @Put('subscriptions/:id/status')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Update subscription status' })
  @ApiResponse({ status: 200, description: 'Subscription status updated' })
  async updateSubscriptionStatus(@Param('id') id: string, @Body() statusDto: SubscriptionStatusDto) {
    return this.billingService.updateSubscriptionStatus(id, statusDto.status);
  }

  @Get('tenants/:tenantId/subscriptions')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get subscriptions for a tenant' })
  @ApiResponse({ status: 200, description: 'List of subscriptions for the tenant' })
  async getTenantSubscriptions(@Param('tenantId') tenantId: string) {
    return this.billingService.getTenantSubscriptions(tenantId);
  }

  @Get('stats/overview')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get billing statistics overview' })
  @ApiResponse({ status: 200, description: 'Billing statistics' })
  async getBillingStats() {
    return this.billingService.getBillingStats();
  }

  @Get('revenue/monthly')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get monthly revenue data' })
  @ApiResponse({ status: 200, description: 'Monthly revenue data' })
  async getMonthlyRevenue() {
    return this.billingService.getMonthlyRevenue();
  }

  @Get('revenue/yearly')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get yearly revenue data' })
  @ApiResponse({ status: 200, description: 'Yearly revenue data' })
  async getYearlyRevenue() {
    return this.billingService.getYearlyRevenue();
  }

  @Get('plans')
  @ApiOperation({ summary: 'Get available plans' })
  @ApiResponse({ status: 200, description: 'List of available plans' })
  async getPlans() {
    return this.billingService.getPlans();
  }

  @Post('webhooks/stripe')
  @ApiOperation({ summary: 'Handle Stripe webhooks' })
  @ApiResponse({ status: 200, description: 'Webhook processed' })
  async handleStripeWebhook(@Body() payload: any) {
    return this.billingService.handleStripeWebhook(payload);
  }
} 
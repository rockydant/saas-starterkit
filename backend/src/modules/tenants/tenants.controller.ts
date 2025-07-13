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
import { TenantService } from './tenant.service';
import { CreateTenantDto, UpdateTenantDto, TenantStatusDto, TenantPlanDto } from './dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/guards/roles.guard';
import { Roles } from '@/modules/auth/decorators/roles.decorator';
import { UserRole } from '@/modules/users/entities/user.entity';

@ApiTags('Tenants')
@Controller('tenants')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TenantsController {
  constructor(private readonly tenantService: TenantService) {}

  @Get()
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get all tenants' })
  @ApiResponse({ status: 200, description: 'List of all tenants' })
  async findAll(@Query() query: any) {
    return this.tenantService.findAll(query);
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get tenant by ID' })
  @ApiResponse({ status: 200, description: 'Tenant details' })
  async findOne(@Param('id') id: string) {
    const tenant = await this.tenantService.findOne(id);
    if (!tenant) {
      throw new HttpException('Tenant not found', HttpStatus.NOT_FOUND);
    }
    return tenant;
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create new tenant' })
  @ApiResponse({ status: 201, description: 'Tenant created successfully' })
  async create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto);
  }

  @Put(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Update tenant' })
  @ApiResponse({ status: 200, description: 'Tenant updated successfully' })
  async update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantService.update(id, updateTenantDto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Delete tenant' })
  @ApiResponse({ status: 200, description: 'Tenant deleted successfully' })
  async remove(@Param('id') id: string) {
    return this.tenantService.remove(id);
  }

  @Put(':id/status')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Update tenant status' })
  @ApiResponse({ status: 200, description: 'Tenant status updated' })
  async updateStatus(@Param('id') id: string, @Body() statusDto: TenantStatusDto) {
    return this.tenantService.updateStatus(id, statusDto.status);
  }

  @Put(':id/plan')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Update tenant plan' })
  @ApiResponse({ status: 200, description: 'Tenant plan updated' })
  async updatePlan(@Param('id') id: string, @Body() planDto: TenantPlanDto) {
    return this.tenantService.updatePlan(id, planDto.plan);
  }

  @Get(':id/users')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get users for a tenant' })
  @ApiResponse({ status: 200, description: 'List of users for the tenant' })
  async getTenantUsers(@Param('id') id: string) {
    return this.tenantService.getTenantUsers(id);
  }

  @Get(':id/subscriptions')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get subscriptions for a tenant' })
  @ApiResponse({ status: 200, description: 'List of subscriptions for the tenant' })
  async getTenantSubscriptions(@Param('id') id: string) {
    return this.tenantService.getTenantSubscriptions(id);
  }

  @Get('stats/overview')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get tenant statistics overview' })
  @ApiResponse({ status: 200, description: 'Tenant statistics' })
  async getTenantStats() {
    return this.tenantService.getTenantStats();
  }
} 
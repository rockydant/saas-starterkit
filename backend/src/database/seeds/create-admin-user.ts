import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { UserService } from '../../modules/users/user.service';
import { TenantService } from '../../modules/tenants/tenant.service';
import { UserRole, UserStatus } from '../../modules/users/entities/user.entity';
import { TenantStatus, TenantPlan } from '../../modules/tenants/entities/tenant.entity';
import * as bcrypt from 'bcryptjs';

async function createAdminUser() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const userService = app.get(UserService);
    const tenantService = app.get(TenantService);

    // Create platform tenant
    const platformTenant = await tenantService.create({
      name: 'Platform Admin',
      subdomain: 'platform',
      description: 'Platform administration tenant',
      plan: TenantPlan.ENTERPRISE,
    });

    // Create super admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const adminUser = await userService.create({
      firstName: 'Super',
      lastName: 'Admin',
      email: 'admin@admin.com',
      password: hashedPassword,
      role: UserRole.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      tenantId: platformTenant.id,
    });

    console.log('✅ Super Admin user created successfully!');
    console.log('📧 Email: admin@admin.com');
    console.log('🔑 Password: admin123');
    console.log('👤 Role: SUPER_ADMIN');
    console.log('🏢 Tenant: Platform Admin');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    
    // Check if user already exists
    if (error.message.includes('Email already exists')) {
      console.log('ℹ️  Admin user already exists. You can use:');
      console.log('📧 Email: admin@admin.com');
      console.log('🔑 Password: admin123');
    }
  } finally {
    await app.close();
  }
}

createAdminUser(); 
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { UserService } from '../../modules/users/user.service';
import { UserRole, UserStatus } from '../../modules/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../modules/users/entities/user.entity';
import * as bcrypt from 'bcryptjs';

async function fixAdminPassword() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const userRepository = app.get(getRepositoryToken(User));

    // Find the admin user
    const adminUser = await userRepository.findOne({
      where: { email: 'admin@admin.com' }
    });
    
    if (!adminUser) {
      console.log('❌ Admin user not found');
      return;
    }

    console.log('👤 Found admin user:', adminUser.email);
    console.log('🔧 Current role:', adminUser.role);

    // Hash the password properly
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    // Update the user with correct password and role
    adminUser.password = hashedPassword;
    adminUser.role = UserRole.SUPER_ADMIN;
    adminUser.status = UserStatus.ACTIVE;
    
    await userRepository.save(adminUser);

    console.log('✅ Admin user password and role updated successfully!');
    console.log('📧 Email: admin@admin.com');
    console.log('🔑 Password: admin123');
    console.log('👤 Role: SUPER_ADMIN');

  } catch (error) {
    console.error('❌ Error updating admin user:', error.message);
  } finally {
    await app.close();
  }
}

fixAdminPassword(); 
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { User, UserStatus, UserRole } from '../users/entities/user.entity';
import { Tenant, TenantStatus, TenantPlan } from '../tenants/entities/tenant.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['tenant'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Account is not active');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenant?.id,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        tenant: user.tenant,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName, tenantName } = registerDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Create or find tenant
    let tenant = await this.tenantRepository.findOne({
      where: { name: tenantName },
    });

    if (!tenant) {
      tenant = this.tenantRepository.create({
        name: tenantName,
        subdomain: tenantName.toLowerCase().replace(/\s+/g, '-'),
        status: TenantStatus.ACTIVE,
        plan: TenantPlan.FREE,
      });
      await this.tenantRepository.save(tenant);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: UserRole.ADMIN, // First user in tenant is admin
      status: UserStatus.ACTIVE,
      tenant,
    });

    await this.userRepository.save(user);

    // Generate JWT token
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      tenantId: tenant.id,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        tenant,
      },
    };
  }

  async logout(req: any, res: Response) {
    // Clear the JWT token from cookies if using cookie-based auth
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    // In a production environment, you might want to:
    // 1. Add the token to a blacklist in Redis
    // 2. Track logout events for audit purposes
    // 3. Invalidate refresh tokens

    return {
      message: 'Logged out successfully',
      timestamp: new Date().toISOString(),
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      // Don't reveal if user exists or not
      return { message: 'If an account with this email exists, a reset link has been sent.' };
    }

    // Generate reset token (in production, this would be sent via email)
    const resetToken = this.jwtService.sign(
      { sub: user.id, type: 'password_reset' },
      { expiresIn: '1h' }
    );

    // In production, send email with reset link
    // For now, just return the token
    return {
      message: 'If an account with this email exists, a reset link has been sent.',
      resetToken, // Remove this in production
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, newPassword } = resetPasswordDto;

    try {
      // Verify reset token
      const payload = this.jwtService.verify(token);
      
      if (payload.type !== 'password_reset') {
        throw new BadRequestException('Invalid reset token');
      }

      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      // Update password
      user.password = hashedPassword;
      await this.userRepository.save(user);

      return { message: 'Password has been reset successfully' };
    } catch (error) {
      throw new BadRequestException('Invalid or expired reset token');
    }
  }

  async validateUser(userId: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['tenant'],
    });

    if (user && user.status === UserStatus.ACTIVE) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
} 
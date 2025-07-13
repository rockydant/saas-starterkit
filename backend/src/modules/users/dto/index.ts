import { IsString, IsOptional, IsEnum, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserStatus } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ description: 'User first name' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'User last name' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'User phone number' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'User role', enum: UserRole })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({ description: 'User status', enum: UserStatus })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiProperty({ description: 'Tenant ID' })
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiProperty({ description: 'User avatar URL' })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({ description: 'User preferences' })
  @IsOptional()
  preferences?: Record<string, any>;
}

export class UpdateUserDto {
  @ApiProperty({ description: 'User first name' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ description: 'User last name' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ description: 'User email' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'User phone number' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'User role', enum: UserRole })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({ description: 'User status', enum: UserStatus })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiProperty({ description: 'User avatar URL' })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({ description: 'User preferences' })
  @IsOptional()
  preferences?: Record<string, any>;
}

export class UserRoleDto {
  @ApiProperty({ description: 'User role', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;
}

export class UserStatusDto {
  @ApiProperty({ description: 'User status', enum: UserStatus })
  @IsEnum(UserStatus)
  status: UserStatus;
} 
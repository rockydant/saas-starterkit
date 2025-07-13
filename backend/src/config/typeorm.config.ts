import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('DB_HOST', 'localhost'),
      port: this.configService.get('DB_PORT', 5432),
      username: this.configService.get('DB_USERNAME', 'saas_user'),
      password: this.configService.get('DB_PASSWORD', 'saas_password'),
      database: this.configService.get('DB_NAME', 'saas_platform'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      synchronize: false, // Temporarily disable for debugging
      logging: this.configService.get('NODE_ENV') === 'development',
      ssl: this.configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
      connectTimeoutMS: 10000,
      extra: {
        connectionTimeoutMillis: 10000,
        query_timeout: 10000,
      },
    };
  }
} 
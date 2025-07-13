import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { BillingModule } from './modules/billing/billing.module';
import { AdminModule } from './modules/admin/admin.module';
import { CommonModule } from './common/common.module';

// Configuration
import { TypeOrmConfig } from './config/typeorm.config';
import { JwtConfig } from './config/jwt.config';
import { StripeConfig } from './config/stripe.config';
import { EmailConfig } from './config/email.config';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Database
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),

    // Task scheduling
    ScheduleModule.forRoot(),

    // Queue management
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT) || 6379,
        },
      }),
    }),

    // Event emitter
    EventEmitterModule.forRoot(),

    // Application modules
    AuthModule,
    UsersModule,
    TenantsModule,
    BillingModule,
    AdminModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {} 
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeConfig {
  constructor(private configService: ConfigService) {}

  get secretKey(): string {
    return this.configService.get('STRIPE_SECRET_KEY', '');
  }

  get publishableKey(): string {
    return this.configService.get('STRIPE_PUBLISHABLE_KEY', '');
  }

  get webhookSecret(): string {
    return this.configService.get('STRIPE_WEBHOOK_SECRET', '');
  }

  get currency(): string {
    return this.configService.get('STRIPE_CURRENCY', 'usd');
  }
} 
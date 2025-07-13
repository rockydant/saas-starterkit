import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailConfig {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get('EMAIL_HOST', 'smtp.gmail.com');
  }

  get port(): number {
    return this.configService.get('EMAIL_PORT', 587);
  }

  get secure(): boolean {
    return this.configService.get('EMAIL_SECURE', false);
  }

  get user(): string {
    return this.configService.get('EMAIL_USER', '');
  }

  get password(): string {
    return this.configService.get('EMAIL_PASSWORD', '');
  }

  get from(): string {
    return this.configService.get('EMAIL_FROM', 'noreply@saasplatform.com');
  }
} 
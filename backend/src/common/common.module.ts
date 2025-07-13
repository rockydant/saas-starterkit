import { Module } from '@nestjs/common';
import { CommonService } from './services/common.service';
import { EmailService } from './services/email.service';
import { FileService } from './services/file.service';
import { TenantService } from './services/tenant.service';

@Module({
  providers: [CommonService, EmailService, FileService, TenantService],
  exports: [CommonService, EmailService, FileService, TenantService],
})
export class CommonModule {} 
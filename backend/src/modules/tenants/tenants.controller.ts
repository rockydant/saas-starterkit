import { Controller, Get } from '@nestjs/common';

@Controller('tenants')
export class TenantsController {
  @Get()
  findAll() {
    return [{ id: 1, name: 'Test Tenant' }];
  }
} 
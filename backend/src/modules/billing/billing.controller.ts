import { Controller, Get } from '@nestjs/common';

@Controller('billing')
export class BillingController {
  @Get()
  findAll() {
    return [{ id: 1, status: 'paid' }];
  }
} 
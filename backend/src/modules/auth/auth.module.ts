import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtConfig } from '../../config/jwt.config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [],
  exports: [JwtModule],
})
export class AuthModule {} 
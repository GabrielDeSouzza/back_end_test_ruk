import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { GetUserUseCase } from 'app/UseCases/UserUseCase/GetUseUseCase';
import { UserRepository } from 'domain/Repositories/UserRepository';
import { PrismaService } from 'infra/database/PrismaService/prismaService';
import { UserPrismaServiceRepository } from 'infra/database/PrismaService/UserPrismaServiceRepository/userPrismaServiceRepository';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: UserPrismaServiceRepository,
    },
    PrismaService,
    GetUserUseCase,
    JwtService,
  ],
  exports: [JwtService],
})
export class GuardModule {}

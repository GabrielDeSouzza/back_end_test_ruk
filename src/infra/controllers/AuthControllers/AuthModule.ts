import { Module } from '@nestjs/common';
import { CreateUserUseCase } from 'app/UseCases/UserUseCase/CreateUserUseCase';
import { UserRepository } from 'domain/Repositories/UserRepository';
import { PrismaService } from 'infra/database/PrismaService/prismaService';
import { UserPrismaServiceRepository } from 'infra/database/PrismaService/UserPrismaServiceRepository/userPrismaServiceRepository';
import { GuardModule } from 'infra/Guard/strategies/JwtModule';
import { GetUserUseCase } from 'app/UseCases/UserUseCase/GetUseUseCase';
import { LoginUseCase } from 'app/UseCases/LoginUseCase/LoginUseCase';
import { AuthCntroller } from './AuthController';

@Module({
  imports: [GuardModule],
  controllers: [AuthCntroller],
  providers: [
    {
      provide: UserRepository,
      useClass: UserPrismaServiceRepository,
    },
    PrismaService,
    CreateUserUseCase,
    LoginUseCase,
    GetUserUseCase,
  ],
})
export class AuthModule {}

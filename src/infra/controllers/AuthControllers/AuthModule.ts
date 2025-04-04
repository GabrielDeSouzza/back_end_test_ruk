import { Module } from '@nestjs/common';
import { CreateUserUseCase } from 'src/app/UseCases/UserUseCase/CreateUserUseCase';
import { UserRepository } from 'src/domain/Repositories/UserRepository';
import { PrismaService } from 'src/infra/database/PrismaService/prismaService';
import { UserPrismaServiceRepository } from 'src/infra/database/PrismaService/UserPrismaServiceRepository/userPrismaServiceRepository';
import { GuardModule } from 'src/infra/Guard/strategies/JwtModule';
import { GetUserUseCase } from 'src/app/UseCases/UserUseCase/GetUseUseCase';
import { LoginUseCase } from 'src/app/UseCases/LoginUseCase/LoginUseCase';
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

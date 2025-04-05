import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { GetUserUseCase } from '../UserUseCase/GetUseUseCase';
import { SignValidationDto } from './Dto/SingInDto';
import { EncryptionUtils } from 'app/Utils/EncryptionUtils';
import { LoginDataDto } from 'domain/Dtos/LoginData';
import { PayloadTokenDto } from 'domain/Dtos/PayloadLoginDto';
import { LoginRepository } from 'domain/Repositories/LoginRepository';

@Injectable()
export class LoginUseCase implements LoginRepository {
  constructor(
    private getUserUseCase: GetUserUseCase,
    private jwtService: JwtService,
  ) {}

  async Sign(SignRequest: SignValidationDto): Promise<LoginDataDto> {
    if (!SignRequest || !SignRequest.email || !SignRequest.password) {
      throw new BadRequestException('É Nessario enviar a Senha e Email');
    }
    const user = await this.getUserUseCase.execute({
      email: SignRequest.email,
    });
    if (
      !(await EncryptionUtils.decryption(SignRequest?.password, user?.password))
    ) {
      throw new UnauthorizedException('Acesso Negado');
    }

    const payload: PayloadTokenDto = {
      email: user.email,
      id: user.id,
    };

    return {
      token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_KEY,
        expiresIn: '1d',
      }),
    };
  }
}

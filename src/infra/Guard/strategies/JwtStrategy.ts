import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { GetUserUseCase } from 'src/app/UseCases/UserUseCase/GetUseUseCase';
import { PayloadTokenDto } from 'src/domain/Dtos/PayloadLoginDto';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly getUserUseCase: GetUserUseCase) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(payload: PayloadTokenDto) {
    const { id } = payload;
    const user = await this.getUserUseCase.execute({ id });

    if (!user) {
      throw new UnauthorizedException('AURIZAÇÃO INVALIDA/EXPIRADA');
    }

    return payload;
  }
}

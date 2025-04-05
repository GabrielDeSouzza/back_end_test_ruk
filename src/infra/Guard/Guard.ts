import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PayloadTokenDto } from 'domain/Dtos/PayloadLoginDto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('USUARIO NÃO AUTORIZADO');
    }
    try {
      const payload = await this.jwtService.verifyAsync<PayloadTokenDto>(
        token,
        {
          secret: process.env.JWT_KEY,
        },
      );
      request.user = payload;
    } catch {
      throw new UnauthorizedException('USUARIO NÃO AUTORIZADO');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

import { UserRepository } from 'domain/Repositories/UserRepository';
import { GetUserDto } from 'domain/Entities/User/Dto/GetUserDto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(request: GetUserDto) {
    if (Object.keys(request).length === 0)
      throw new BadRequestException('É NESSSARIO ENVIAR OS DADOS DE PESQUISA');
    const user = await this.userRepository.getUser(request);
    if (!user) throw new NotFoundException('Usuario Não Encontrado');

    return user;
  }
}

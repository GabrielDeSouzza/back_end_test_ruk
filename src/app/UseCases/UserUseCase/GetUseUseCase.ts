import { UserRepository } from 'src/domain/Repositories/UserRepository';
import { GetUserDto } from 'src/domain/Entities/User/Dto/GetUserDto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(request: GetUserDto) {
    const user = await this.userRepository.getUser(request);
    if (!user) throw new BadRequestException('Usuario Não Encontrado');

    return user;
  }
}

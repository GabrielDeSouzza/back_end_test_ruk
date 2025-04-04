import { BadRequestException, Injectable } from '@nestjs/common';
import { EncryptionUtils } from 'src/app/Utils/EncryptionUtils';
import { TelephoneEntity } from 'src/domain/Entities/Telephones/TelephonesEntity';
import { CreateUserDto } from 'src/app/UseCases/UserUseCase/Dto/CreateUserDto';
import { UserEntity } from 'src/domain/Entities/User/UserEntity';
import { UserRepository } from 'src/domain/Repositories/UserRepository';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(user: CreateUserDto) {
    if (Object.keys(user).length === 0)
      throw new BadRequestException('É NESSARIO ENVIAR OS DADOS DO USUARIO');

    user.email = user?.email?.toLowerCase();
    const emailInUse = await this.userRepository.getUser({
      email: user.email,
    });

    if (emailInUse) {
      throw new BadRequestException(`O EMAIL ${user.email} já esta em uso`);
    }
    const userEntity = new UserEntity({
      createdAt: new Date(),
      email: user.email,
      modifiedAt: new Date(),
      name: user.name,
      password: await EncryptionUtils.encryption(user.password),
      telephones: user.telephones.map((telephone) => {
        return new TelephoneEntity({
          areaCode: telephone.areaCode,
          number: telephone.number,
        });
      }),
    });
    const userCreated = this.userRepository.createUser(userEntity);
    return userCreated;
  }
}

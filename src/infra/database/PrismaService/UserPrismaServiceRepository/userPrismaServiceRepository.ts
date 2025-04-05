import { Injectable } from '@nestjs/common';
import { UserEntity } from 'domain/Entities/User/UserEntity';
import { UserRepository } from 'domain/Repositories/UserRepository';
import { PrismaService } from '../prismaService';
import { UserPrismaDto } from '../dto/UserPrismaDto/UserPrismaDto';
import { GetUserDto } from 'domain/Entities/User/Dto/GetUserDto';

@Injectable()
export class UserPrismaServiceRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}
  async createUser(user: UserEntity): Promise<UserEntity> {
    const dataPrisma = await this.prisma.user.create({
      data: UserPrismaDto.CreateUserPrismaDto(user),
      include: { Telephone: true },
    });
    return UserPrismaDto.PrismaToEntity(dataPrisma, dataPrisma.Telephone);
  }
  async getUser(request: GetUserDto): Promise<UserEntity> {
    const data = await this.prisma.user.findFirst({
      where: {
        OR: [{ id: request.id }, { email: request.email }],
      },
      include: { Telephone: true },
    });
    if (!data) return undefined;
    return UserPrismaDto.PrismaToEntity(data, data.Telephone);
  }
}

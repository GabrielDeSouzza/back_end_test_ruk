import {
  User as UserPrisma,
  Telephone as TelephonePrisma,
  Prisma,
} from '@prisma/client';
import { UserEntity } from 'domain/Entities/User/UserEntity';

export class UserPrismaDto {
  public static PrismaToEntity(
    data: UserPrisma,
    telephones: TelephonePrisma[],
  ): UserEntity {
    const userEntity = new UserEntity({
      id: data.id,
      createdAt: data.created_at,
      email: data.email,
      modifiedAt: data.modified_at,
      name: data.name,
      password: data.password,
      telephones: telephones.map((telephone) => {
        return { area_code: telephone.area_code, number: telephone.number };
      }),
    });
    return userEntity;
  }
  public static CreateUserPrismaDto(data: UserEntity) {
    const prismaQuery: Prisma.UserCreateInput = {
      created_at: new Date(),
      email: data.email,
      modified_at: new Date(),
      name: data.name,
      password: data.password,
      Telephone: {
        createMany: {
          skipDuplicates: true,
          data: data.telephones.map((telephone) => {
            return {
              area_code: telephone.area_code,
              number: telephone.number,
            };
          }),
        },
      },
    };
    return prismaQuery;
  }
}

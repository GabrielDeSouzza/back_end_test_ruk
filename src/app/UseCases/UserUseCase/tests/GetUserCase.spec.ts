import { UserRepository } from 'domain/Repositories/UserRepository';
import { GetUserUseCase } from '../GetUseUseCase';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { GetUserDto } from 'domain/Entities/User/Dto/GetUserDto';
import { UserEntity } from 'domain/Entities/User/UserEntity';

describe('GetUserUseCase', () => {
  let getUserUseCase: GetUserUseCase;
  let userRepositoryMock: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    userRepositoryMock = {
      getUser: jest.fn(),
      createUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserUseCase,
        { provide: UserRepository, useValue: userRepositoryMock },
      ],
    }).compile();

    getUserUseCase = module.get<GetUserUseCase>(GetUserUseCase);
  });

  it('should be defined', () => {
    expect(getUserUseCase).toBeDefined();
  });

  it('should throw an error if the user data is empty', async () => {
    await expect(getUserUseCase.execute({} as GetUserDto)).rejects.toThrow(
      new BadRequestException('É NESSSARIO ENVIAR OS DADOS DE PESQUISA'),
    );
  });
  it('should return a userEntity seaching by email', async () => {
    const request: GetUserDto = {
      email: 'test123@gmail.com',
    };
    const mockReturn = { email: 'test123@gmail.com' } as UserEntity;
    userRepositoryMock.getUser.mockResolvedValue(mockReturn);
    const result = await getUserUseCase.execute(request);
    expect(result).toEqual(
      expect.objectContaining({
        email: request.email,
      }),
    );
  });
  it('should return a userEntity seaching by id', async () => {
    const request: GetUserDto = {
      id: '123456',
    };
    const mockReturn = { id: '123456' } as UserEntity;
    userRepositoryMock.getUser.mockResolvedValue(mockReturn);
    const result = await getUserUseCase.execute(request);
    expect(result).toEqual(
      expect.objectContaining({
        id: request.id,
      }),
    );
  });
});

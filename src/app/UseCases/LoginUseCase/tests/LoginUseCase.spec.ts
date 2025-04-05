import { Test, TestingModule } from '@nestjs/testing';
import { LoginUseCase } from 'src/app/UseCases/LoginUseCase/LoginUseCase';
import { GetUserUseCase } from 'src/app/UseCases/UserUseCase/GetUseUseCase';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { EncryptionUtils } from 'src/app/Utils/EncryptionUtils';
import { SingInValidationDto } from 'src/app/UseCases/LoginUseCase/Dto/SingInDto';
import { UserEntity } from 'src/domain/Entities/User/UserEntity';
import { UserRepository } from 'src/domain/Repositories/UserRepository';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let getUserUseCaseMock: jest.Mocked<GetUserUseCase>;
  let jwtServiceMock: jest.Mocked<JwtService>;
  let userRepositoryMock: jest.Mocked<UserRepository>;
  beforeEach(async () => {
    userRepositoryMock = {
      getUser: jest.fn(),
      createUser: jest.fn(),
    };
    jwtServiceMock = {
      signAsync: jest.fn(),
      verify: jest.fn(),
    } as unknown as jest.Mocked<JwtService>;
    getUserUseCaseMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetUserUseCase>;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        {
          provide: GetUserUseCase,
          useValue: getUserUseCaseMock, // Usamos o mock aqui
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        { provide: UserRepository, useValue: { getUser: jest.fn() } },
        {
          provide: EncryptionUtils,
          useValue: {
            encryption: jest.fn(),
            decryption: jest.fn(),
          },
        },
      ],
    }).compile();

    // Injeção das dependências mockadas
    loginUseCase = module.get<LoginUseCase>(LoginUseCase);
  });

  it('should be defined', () => {
    expect(loginUseCase).toBeDefined();
  });

  it('should throw BadRequestException if password not send', async () => {
    const request: SingInValidationDto = {
      email: 'test@test.com',
      password: undefined,
    };

    getUserUseCaseMock.execute.mockResolvedValue(null);
    await expect(loginUseCase.singIn(request)).rejects.toThrow(
      new BadRequestException('É Nessario enviar todos Senha e Email'),
    );
  });

  it('should throw UnauthorizedException if password is incorrect', async () => {
    const request: SingInValidationDto = {
      email: 'test@test.com',
      password: 'incorrect password',
    };
    const user = new UserEntity({
      email: 'test@test.com',
      password: 'hashedPassword',
      id: 'user-id',
      name: 'Test User',
      createdAt: new Date(),
      modifiedAt: new Date(),
      telephones: [],
    });

    jest.spyOn(EncryptionUtils, 'decryption').mockResolvedValue(false);
    getUserUseCaseMock.execute.mockResolvedValue(user);
    await expect(loginUseCase.singIn(request)).rejects.toThrow(
      new UnauthorizedException('Acesso Negado'),
    );
  });

  it('should return token if password is correct', async () => {
    const request: SingInValidationDto = {
      email: 'test@test.com',
      password: 'correectPassword',
    };
    const user = new UserEntity({
      email: 'test@test.com',
      password: 'hashedPassword',
      id: 'user-id',
      name: 'Test User',
      createdAt: new Date(),
      modifiedAt: new Date(),
      telephones: [],
    });
    jest.spyOn(EncryptionUtils, 'decryption').mockResolvedValue(true);
    getUserUseCaseMock.execute.mockResolvedValue(user);
    const token = 'some token';
    jwtServiceMock.signAsync.mockResolvedValue(token);

    const result = await loginUseCase.singIn(request);

    expect(result.token).toBe(token);
    expect(jwtServiceMock.signAsync).toHaveBeenCalledWith(
      {
        email: user.email,
        id: user.id,
      },
      { secret: process.env.JWT_KEY, expiresIn: '1d' },
    );
  });
});

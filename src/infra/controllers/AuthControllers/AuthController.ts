import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserUseCase } from 'app/UseCases/UserUseCase/CreateUserUseCase';
import { CreateUserDto } from 'app/UseCases/UserUseCase/Dto/CreateUserDto';
import { CreateUserResponse } from './dto/CreateUserResponse';
import { LoginDataDto } from 'domain/Dtos/LoginData';
import { LoginUseCase } from 'app/UseCases/LoginUseCase/LoginUseCase';
import { GetUserUseCase } from 'app/UseCases/UserUseCase/GetUseUseCase';
import { GetUserControllerResponseDto } from './dto/GetUserControllerResponse';
import { AuthGuard } from 'infra/Guard/Guard';
import { SignDto } from 'domain/Dtos/SingInData';

@Controller('auth')
export class AuthCntroller {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Post('singUp')
  async singUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponse> {
    const userData = await this.createUserUseCase.execute(createUserDto);
    return {
      created_at: userData.createdAt,
      id: userData.id,
      modified_at: userData.modifiedAt,
    };
  }

  @Post('Sign')
  async sinIn(@Body() createUserDto: SignDto): Promise<LoginDataDto> {
    const loginData = await this.loginUseCase.Sign(createUserDto);
    return loginData;
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req): Promise<GetUserControllerResponseDto> {
    const user = await this.getUserUseCase.execute(req.user);
    return {
      created_at: user.createdAt,
      id: user.id,
      modifed_at: user.modifiedAt,
      name: user.name,
      telephones: user.telephones,
    };
  }
}

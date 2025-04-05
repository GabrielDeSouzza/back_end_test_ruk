import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserUseCase } from 'src/app/UseCases/UserUseCase/CreateUserUseCase';
import { CreateUserDto } from 'src/app/UseCases/UserUseCase/Dto/CreateUserDto';
import { CreateUserResponse } from './dto/CreateUserResponse';
import { LoginDataDto } from 'src/domain/Dtos/LoginData';
import { SingInDto } from 'src/domain/Dtos/SinginData';
import { LoginUseCase } from 'src/app/UseCases/LoginUseCase/LoginUseCase';
import { GetUserUseCase } from 'src/app/UseCases/UserUseCase/GetUseUseCase';
import { GetUserControllerResponseDto } from './dto/GetUserControllerResponse';
import { AuthGuard } from 'src/infra/Guard/Guard';

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

  @Post('singIn')
  async sinIn(@Body() createUserDto: SingInDto): Promise<LoginDataDto> {
    const loginData = await this.loginUseCase.singIn(createUserDto);
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

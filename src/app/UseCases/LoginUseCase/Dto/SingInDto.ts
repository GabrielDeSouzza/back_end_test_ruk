import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SingInDto } from 'src/domain/Dtos/SinginData';

export abstract class SingInValidationDto implements SingInDto {
  @IsEmail({}, { message: 'EMAIL INVALIDO' })
  @IsNotEmpty({ message: 'DIGITE UM EMAIL' })
  email: string;
  @IsString()
  @IsNotEmpty({ message: 'DIGITE A SENHA' })
  password: string;
}

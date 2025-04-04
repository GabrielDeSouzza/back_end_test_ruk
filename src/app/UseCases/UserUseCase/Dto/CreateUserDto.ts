import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  MinLength,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateTelephoneDto } from './CreateTelefoneDto';
import { Type } from 'class-transformer';

export abstract class CreateUserDto {
  @MinLength(2, { message: 'O NOME TEM QUE TER PELO MENOS 2 CARACTERES' })
  @MaxLength(80, { message: 'O NOME NÃO PODE TER MAIS DE 80 CARACTERES' })
  name: string;
  @IsEmail({}, { message: 'EMAIL INVALIDO' })
  @MinLength(5, { message: 'O EMAIL TEM QUE TER PELO MENOS 5 CARACTERES' })
  @MaxLength(80, { message: 'O EMAIL NÃO PODE TER MAIS DE 80 CARACTERES' })
  @IsNotEmpty({ message: 'O EMAIL NÃO PODE SER VAZIO' })
  email: string;
  @IsString()
  @IsNotEmpty({ message: 'DIGITE UMA SENHA' })
  password: string;
  @IsArray({ message: 'DIGITE AO MENOS UM TELEFONE', always: false })
  @ArrayMinSize(1, { message: 'DIGITE AO MENOS UM TELEFONE' })
  @Type(() => CreateTelephoneDto)
  @ValidateNested({ each: true })
  telephones: CreateTelephoneDto[];
}

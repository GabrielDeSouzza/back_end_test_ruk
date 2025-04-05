import { IsNumber, IsNotEmpty, Validate } from 'class-validator';
import { IsPhoneNumberValid } from 'app/Utils/TelephoneValidation';

export abstract class CreateTelephoneDto {
  @IsNumber()
  @IsNotEmpty()
  @Validate(IsPhoneNumberValid, {
    message: 'O número deve ter entre 8 e 9 dígitos',
  })
  number: number;
  @IsNumber()
  @IsNotEmpty()
  @Validate(IsPhoneNumberValid, {
    message: 'O CÓDIGO de área deve ter exatamente 2 dígitos',
  })
  areaCode: number;
}

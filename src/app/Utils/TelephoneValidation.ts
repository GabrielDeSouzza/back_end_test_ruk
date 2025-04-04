import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsPhoneNumberValid implements ValidatorConstraintInterface {
  validate(value: number, args: ValidationArguments) {
    const regex = args.property === 'number' ? /^\d{8,9}$/ : /^\d{2}$/;
    return regex.test(value?.toString());
  }

  defaultMessage(args: ValidationArguments) {
    return args.property === 'number'
      ? 'O número deve ter entre 8 e 9 dígitos'
      : 'O código de área deve ter exatamente 2 dígitos';
  }
}

import { TelephoneProps } from 'domain/Entities/User/UserEntity';

export abstract class GetUserControllerResponseDto {
  id: string;
  name: string;
  email: string;
  telephones: TelephoneProps[];
  created_at: Date;
  modified_at: Date;
}

import { TelephoneProps } from 'src/domain/Entities/User/UserEntity';

export abstract class GetUserControllerResponseDto {
  id: string;
  name: string;
  telephones: TelephoneProps[];
  created_at: Date;
  modifed_at: Date;
}

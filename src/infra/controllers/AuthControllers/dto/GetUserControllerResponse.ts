import {
  TelephoneEntity,
  TelephoneProps,
} from 'src/domain/Entities/Telephones/TelephonesEntity';

export abstract class GetUserControllerResponseDto {
  id: string;
  name: string;
  telephones: TelephoneEntity[];
  created_at: Date;
  modifed_at: Date;
}

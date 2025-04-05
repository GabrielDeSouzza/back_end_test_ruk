import { LoginDataDto } from '../Dtos/LoginData';
import { SignDto } from '../Dtos/SingInData';

export abstract class LoginRepository {
  abstract Sign(SignRequest: SignDto): Promise<LoginDataDto>;
}

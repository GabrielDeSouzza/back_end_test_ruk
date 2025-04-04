import { LoginDataDto } from '../Dtos/LoginData';
import { SingInDto } from '../Dtos/SinginData';

export abstract class LoginRepository {
  abstract singIn(singInRequest: SingInDto): Promise<LoginDataDto>;
}

import { GetUserDto } from '../Entities/User/Dto/GetUserDto';
import { UserEntity } from '../Entities/User/UserEntity';

export abstract class UserRepository {
  abstract createUser(user: UserEntity): Promise<UserEntity>;
  abstract getUser(request: GetUserDto): Promise<UserEntity>;
}

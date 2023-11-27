import 'reflect-metadata';
import { IUser } from './user.interface';

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  login: string;
}

export type CreateUserDto = Omit<IUser, 'id' | 'deleted'>;

export interface UpdateUserDto extends Omit<CreateUserDto, 'password'> {
  password?: string;
}

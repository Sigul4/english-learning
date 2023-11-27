import bcrypt from 'bcryptjs';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { knexInstance } from 'db';
import { IUser } from 'src/shared/interfaces/user.interface';
import { USER_TABLE_NAME } from 'src/database/constants/tables.constant';
import { PASSWORD_CONSTANT } from 'src/shared/constants/password.regex.constant';
import { RegisterData } from 'src/shared/interfaces/register.interface';
import { Login } from 'src/shared/interfaces/login.interface';

@Injectable()
export class AuthService {
  public async login(userData: Login): Promise<IUser> {
    console.log('email',userData.email, userData.password)
    const users: IUser[] = await knexInstance.select<IUser[]>('email', 'password').from(USER_TABLE_NAME).where('email', userData.email);
    
    console.log('users',users)
    if (!users.length) {
      throw new NotFoundException('User not found');
    }

    const user: IUser = users[0];
    
    const isPasswordValid = await bcrypt.compare(userData.password, user.password);
    
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid login data');
    }
    
    return users[0];
  }
  
  public async register(userData: RegisterData): Promise<IUser> {
    const users: IUser[] = await knexInstance.select<IUser[]>('*').from(USER_TABLE_NAME).where('email', userData.email);

    if (users.length) {
      throw new Error('Permission denied');
    }

    const isPasswordValid = PASSWORD_CONSTANT.test(userData.password)

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password data');
    }

    userData.password = bcrypt.hashSync(userData.password, 10);

    const [createdUser] = await knexInstance<IUser>(USER_TABLE_NAME).insert(userData).returning('*');
    return createdUser
  }

  public async resetUserPassword(email: string, password: string): Promise<IUser> {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const userWithUpdatedPassword: IUser = (await knexInstance<IUser>(USER_TABLE_NAME).where('email', email).update({ password: encryptedPassword }).returning('*'))[0];

    return userWithUpdatedPassword;
  }
}

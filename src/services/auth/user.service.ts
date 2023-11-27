import bcrypt from 'bcryptjs';
import { knexInstance } from 'db';
import { existsSync } from 'fs';
import fs from 'fs/promises';
import { BadRequestError, NotFoundError } from 'routing-controllers';
import { USER_TABLE_NAME } from 'src/database/constants/tables.constant';
import { CreateUserDto, UpdateUserDto, UserDto } from 'src/shared/interfaces/user.dto.interface';
import { IUser } from 'src/shared/interfaces/user.interface';

export class UserService {

  private async handleErrors<T>(promise: Promise<T>, errorMessage: string): Promise<T> {
    try {
      const result = await promise;
      return result;
    } catch (error) {
      throw new BadRequestError(errorMessage);
    }
  }

  public async getAllUsers(): Promise<UserDto[]> {
    const users: IUser[] = await this.handleErrors(
      knexInstance<IUser>(USER_TABLE_NAME).select('*').where('deleted', false),
      'Failed to fetch users.'
    );

    return users.map((user: IUser) => this.userToDto(user));
  }

  public async createUser(userDto: CreateUserDto): Promise<UserDto> {
    userDto.password = bcrypt.hashSync(userDto.password, 10);

    const createdUserList: IUser[] = await this.handleErrors(
      knexInstance<IUser>(USER_TABLE_NAME).insert(userDto).returning('*'),
      'Failed to create user.'
    );

    if (createdUserList.length === 0) {
      throw new NotFoundError('User wasn\'t created.');
    }

    return this.userToDto(createdUserList[0]);
  }

  public async editUser(id: string, userDto: UpdateUserDto): Promise<UserDto> {
    if (userDto.password) {
      userDto.password = bcrypt.hashSync(userDto.password, 10);
    }

    const updatedUserList: IUser[] = await this.handleErrors(
      knexInstance<IUser>(USER_TABLE_NAME).where('id', id).update({ ...userDto }).returning('*'),
      'Failed to edit user.'
    );

    if (updatedUserList.length === 0) {
      throw new NotFoundError('User not found.');
    }

    return this.userToDto(updatedUserList[0]);
  }

  public async deleteUser(id: string): Promise<{ id: string }> {
    const deletedUser = await this.handleErrors(
      knexInstance<IUser>(USER_TABLE_NAME).where('id', id).first(),
      'Failed to delete user.'
    );

    if (!deletedUser) {
      throw new NotFoundError('User not found.');
    }

    await knexInstance<IUser>(USER_TABLE_NAME).where('id', id).update({ deleted: true });

    return {
      id
    };
  }

  public userToDto(user: IUser): UserDto {
    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      login: user.login,
    };
  }
}

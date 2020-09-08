import { UndefinedException } from './../interfaces/exception';
import { Message } from './../interfaces/basic';
import { UserEntity } from './../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Exception } from '../interfaces/exception';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private connection: Connection,
  ) {}

  /**
   * This function create user if doesn't exists
   * @param user UserEntity
   * @return <UserEntity | undefined | Exception>
   */
  async createUser(
    userData: { username: string, password: string },
  ): Promise<UserEntity | undefined | Exception> {
    if ((await this.findOne(userData.username)) !== undefined) {
      return {
        message: 'Error',
        desc: `User ${userData.username} already exists!`,
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const user: UserEntity = new UserEntity();
    // eslint-disable-next-line @typescript-eslint/camelcase
    user.access_level = 10;
    user.username = userData.username;
    user.salt = salt;
    user.password = hashedPassword;


    const runner = this.connection.createQueryRunner();

    await runner.connect();
    await runner.startTransaction();

    try {
      await runner.manager.save(user);
      await runner.commitTransaction();

      return user;
    } catch (err) {
      await runner.rollbackTransaction();
    } finally {
      runner.release();
    }
    return {
      message: 'Error',
      desc: 'Something went wrong',
    };
  }

  /**
   * Find specific user by username
   * @param username string
   * @return <undefined | UserEntity>
   */
  async findOne(username: string): Promise<undefined | UserEntity> {
    const user = await this.userRepository.findOne({ username: username });

    if (!user) return undefined;

    return user;
  }

  /**
   * Delete user of given username
   * @param username strings
   * @return <Exception | Message | UndefinedException>
   */
  async deleteOne(
    username: string,
  ): Promise<Exception | Message | UndefinedException> {
    if (this.findOne(username)) {
      try {
        this.userRepository.delete({ username: username });

        return {
          message: 'Ok',
          desc: `User ${username} has been deleted.`,
        };
      } catch (err) {
        return {
          message: 'Error',
          desc: 'Unexpected exception',
          error: err,
        };
      }
    } else {
      return {
        message: 'Error',
        desc: `Could not find user ${username}`,
      };
    }
  }
}

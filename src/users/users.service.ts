import { UndefinedException } from './../interfaces/exception';
import { Message } from './../interfaces/basic';
import { UserEntity } from './../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Exception } from '../interfaces/exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private connection: Connection,
  ) {}

  async createUser(
    user: UserEntity,
  ): Promise<UserEntity | undefined | Exception> {
    if ((await this.findOne(user.username)) !== undefined) {
      return {
        message: 'Error',
        desc: `User ${user.username} already exists!`,
      };
    }

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

  async findOne(username: string): Promise<undefined | any> {
    const user = await this.userRepository.findOne({ username: username });

    if (!user) return undefined;

    return {
      username: user.username,
      accessLevel: user.access_level,
    };
  }

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

import { UserEntity } from './../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private connection: Connection,
  ) {}

  async createUser(user: UserEntity): Promise<UserEntity | undefined> {
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
    return;
  }

  async findOne(username: string): Promise<any | undefined> {
    const user = await this.userRepository.findOne({ username: username });

    if (!user) return;

    return {
      username: user.username,
      accessLevel: user.access_level,
    };
  }
}

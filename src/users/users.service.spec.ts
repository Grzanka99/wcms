import { UserEntity } from './../entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { UsersService } from './users.service';
import { createTestDB } from '../utils/testing-helpers/createTestDB';

/* eslint-disable @typescript-eslint/camelcase */
describe('User Service', () => {
  let db: Connection;
  let service: UsersService;
  let repo: Repository<UserEntity>;

  const user: UserEntity = new UserEntity();
  user.access_level = 3;
  user.password = 'test1';
  user.salt = 'salt1';
  user.username = 'username1';

  beforeAll(async () => {
    db = await createTestDB([UserEntity]);
    repo = await db.getRepository(UserEntity);
    service = new UsersService(repo, db);

    await db.getRepository(UserEntity).clear();
  });

  afterAll(async () => {
    await db.getRepository(UserEntity).clear();
    db.close();
  });

  it('should create user', async () => {
    expect(await service.createUser(user)).toMatchObject(user);
  });

  it('should return exception "user already exists', async () => {
    expect(await service.createUser(user)).toMatchObject({
      message: 'Error',
      desc: `User ${user.username} already exists!`,
    });
  });

  it('should find user', async () => {
    expect(await service.findOne(user.username)).toMatchObject(user);
  });

  it("should't find user", async () => {
    expect(await service.findOne('noone')).toBe(undefined);
  });

  it('should delete user', async () => {
    expect(await service.deleteOne(user.username)).toMatchObject({
      message: 'Ok',
      desc: `User ${user.username} has been deleted.`,
    });
  });
});

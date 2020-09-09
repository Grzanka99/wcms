import { UserEntity } from './../entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { UsersService } from './users.service';
import { createTestDB } from '../utils/testing-helpers/createTestDB';

/* eslint-disable @typescript-eslint/camelcase */
describe('User Service', () => {
  let db: Connection;
  let service: UsersService;
  let repo: Repository<UserEntity>;

  const userData = {
    username: 'username1',
    password: 'test1',
  };

  beforeAll(async () => {
    db = await createTestDB([UserEntity]);
    repo = db.getRepository(UserEntity);
    service = new UsersService(repo, db);

    await db.getRepository(UserEntity).clear();
  });

  afterAll(async () => {
    await db.getRepository(UserEntity).clear();
    db.close();
  });

  it('should create user (be true)', async () => {
    expect(await service.createUser(userData)).toBe(true);
  });

  it('should return exception "user already exists', async () => {
    expect(await service.createUser(userData)).toMatchObject({
      message: 'Error',
      desc: `User ${userData.username} already exists!`,
    });
  });

  it('should find user (be true)', async () => {
    expect(await service.findOne(userData.username)).toMatchObject({
      access_level: 0,
      id: expect.any(Number),
      password: expect.any(String),
      salt: expect.any(String),
      username: userData.username,
    });
  });

  it("should't find user", async () => {
    expect(await service.findOne('noone')).toBe(undefined);
  });

  it("shouldn't find user", async () => {
    expect(await service.deleteOne('badusername')).toMatchObject({
      message: 'Error',
      desc: 'Could not find user badusername',
    });
  });

  it('should remove user', async () => {
    expect(await service.deleteOne(userData.username)).toMatchObject({
      message: 'Ok',
      desc: `User ${userData.username} has been deleted.`,
    });
  });
});

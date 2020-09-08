import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('Users Controller', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('shoud return user object', async () => {
    expect(
      await controller.getProfile({ user: { userId: 1, username: 'test' } }),
    ).toMatchObject({ userId: 1, username: 'test' });
  });
});

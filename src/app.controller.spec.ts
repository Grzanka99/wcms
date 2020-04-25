import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Hello CMS', () => {
    it('Should return greeting object', () => {
      expect(appController.getHello()).toStrictEqual({
        msg: 'Welcome in Wanna CMS',
        routes: {
          api: {
            v1: '/api/v1',
          },
          admin: '/admin',
        },
      });
    });
  });

  describe('Hello API', () => {
    it('Should return greeting object', () => {
      expect(appController.getHelloApi()).toStrictEqual({
        msg: 'Welcome in Wanna CMS API',
        routes: 'For more information check /api/v1/documentation',
      });
    });
  });

  describe('Admin', () => {
    it('Should return index.html', () => {
      expect(appController.getAdminPage()).toBe('index.html');
    });
  });
});

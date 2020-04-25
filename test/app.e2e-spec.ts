import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect({
        msg: 'Welcome in Wanna CMS',
        routes: { api: { v1: '/api/v1' }, admin: '/admin' },
      });
  });

  it('/api (GET)', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(200)
      .expect({
        msg: 'Welcome in Wanna CMS API',
        routes: 'For more information check /api/v1/documentation',
      });
  });

  it('/admin (GET)', () => {
    return request(app.getHttpServer())
      .get('/admin')
      .expect(200)
      .expect('index.html');
  });
});

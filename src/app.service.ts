import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      msg: 'Welcome in Wanna CMS',
      routes: {
        api: {
          v1: '/api/v1',
        },
        admin: '/admin',
      },
    };
  }

  getHelloApi(): any {
    return {
      msg: 'Welcome in Wanna CMS API',
      routes: 'For more information check /api/v1/documentation',
    };
  }

  getAdminPage(): string {
    return 'index.html';
  }
}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }

  @Get(['api', 'api/v1'])
  getHelloApi(): any {
    return this.appService.getHelloApi();
  }

  @Get('admin')
  getAdminPage(): string {
    return this.appService.getAdminPage();
  }
}

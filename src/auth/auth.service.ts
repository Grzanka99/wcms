import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SafeUser } from 'src/interfaces/basic';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<null | SafeUser> {
    const user = await this.usersService.findOne(username);
    if (user && bcrypt.compare(pass, user.password)) {
      const { password, salt, ...result } = user;
      return result;
    }

    return null;
  }

  async register(userData: any): Promise<any> {
    return await this.usersService.createUser(userData);
  }

  async login(user: SafeUser): Promise<any> {
    const payload = { username: user.username, sub: user.id};

    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload),
    }
  }
}

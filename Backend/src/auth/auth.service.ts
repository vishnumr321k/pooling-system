import {
  Injectable,
  BadGatewayException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';
import { Role } from './roles.decorator';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email is already registerd...🥲');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.createUser(
      name,
      email,
      hashedPassword,
      'user',
    );
    return { message: 'The User created Successfully...😎' };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('The Email is incorrect...🥲');
    }

    const matchorNot = await bcrypt.compare(password, user.password);
    if (!matchorNot) {
      throw new UnauthorizedException('The Password is incorrect...🥲');
    }
    const payload = { sub: user._id, email: user.email, role: user.role };
    const token = await this.jwtService.sign(payload);

    return {token:token, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
     };
  }
}

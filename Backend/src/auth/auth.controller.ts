import { Controller, Post, Body } from "@nestjs/common";
import {AuthService} from './auth.service';
import {CreateUserDto} from './create-user.dto';
import {LoginUserDto} from '../users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('register')
    async register(@Body() dto: CreateUserDto){
        return this.authService.register(dto.name, dto.email, dto.password)
    }

    @Post('login')
    async login(@Body() dto: LoginUserDto){
        return this.authService.login(dto.email, dto.password)
    }
}
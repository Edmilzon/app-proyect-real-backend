import { AuthService } from './auth.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { log } from 'console';

@Controller('auth')
export class AuthController {

	constructor( private readonly authService: AuthService){}

	@Post('register')
	register(@Body() registerDto: RegisterDto) {
		return this.authService.register(registerDto);
	}

	@Post('login')
	login(@Body() loginDto : LoginDto) {
			return this.authService.login(loginDto);
	}

	@Get('profile')
	profile(){
		return "Profile"
	}
}

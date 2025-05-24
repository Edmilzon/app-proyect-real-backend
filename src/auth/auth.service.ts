import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bycryptjs from 'bcryptjs'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { emitWarning } from 'process';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ){

    }

    async register(registerDto: RegisterDto){
        const user = await this.userService.findOneByEmail(registerDto.email);

        if(user){ //Nest ya trabaja el tricatch solo es llamar a sus controladores de errroes
            throw new BadRequestException('El ususario ya existe')
        }
        // Encriptar la contraseña
        const hashedPassword = await bycryptjs.hash(registerDto.password, 10);
        registerDto.password = hashedPassword;

        return await this.userService.create(registerDto);
    }

    async login (loginDto: LoginDto){
        const user = await this.userService.findOneByEmail(loginDto.email) 
        if(!user){
            throw new UnauthorizedException('el email es incorrecto')
        }

        const passwordValido = await bycryptjs.compare(loginDto.password, user.password);
        if(!passwordValido){
            throw new UnauthorizedException('la contraseña es incorrecta')
        }

        const payload= {email: user.email};
        
        const token =  await this.jwtService.signAsync(payload)    

        const email = loginDto.email;

        return {
            token,
            email
        };
    }
}

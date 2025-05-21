import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    name: string;

    @IsEmail()
    email:string;

    @Transform(({value}) => value.trim()) //elimina los espacios en blanco 
    @IsString()
    @MinLength(6)
    password:string;
}
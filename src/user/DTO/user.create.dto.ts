import { Injectable } from "@nestjs/common";
import { IsEmail, IsString, MinLength } from "class-validator";

@Injectable()
export class CreateUserDTO{
    @IsString()
    name:string;

    @IsEmail()
    email:string

    @IsString()
    @MinLength(10)
    password:string

    @IsString()
    workName:string
};
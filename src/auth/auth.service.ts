import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    private logger = new Logger(AuthService.name);
    constructor(private jwtService:JwtService, userService:UserService){};

    public async login(){};
};

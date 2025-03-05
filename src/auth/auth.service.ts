import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private logger = new Logger(AuthService.name);
    constructor(private jwtService:JwtService){};

    public async login(){};
};

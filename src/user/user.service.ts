import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
    private prisma;
    private logger = new Logger(UserService.name)
    constructor(private pr:PrismaService){
        this.prisma = pr.user;
    };
};

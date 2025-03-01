import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class UserService {
    private prisma;
    private logger = new Logger(UserService.name)
    constructor(private pr:PrismaService,private redisService:RedisService){
        this.prisma = pr.user;
    };

};

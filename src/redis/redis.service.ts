import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis{
    constructor(){
        const logger = new Logger(RedisService.name);
        super({
            host:process.env.REDIS_HOST,
            port:6379
        }
        );
        if(super.on){
            logger.log("Redis dependencies on!");
        }else{
            logger.error("Redis dependencies off, please restart your program!");
        };
    };
};

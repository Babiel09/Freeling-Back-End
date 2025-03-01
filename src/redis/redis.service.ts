import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis{
    constructor(){
        const logger = new Logger(RedisService.name);
        super();
        if(super.on){
            logger.log("Redis dependencies on!");
        };
        
        if(super.off){
            logger.error("Redis dependencies off, please restart your program!");
        };
        
    };
};

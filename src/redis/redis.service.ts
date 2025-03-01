import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService{
    private client: Redis; 
    private logger = new Logger(RedisService.name);
    constructor(){
        this.client = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
        })
    
        this.client.on('connect', () => {
            this.logger.log('Redis connected successfully!');
        });
    
        this.client.on('error', (err) => {
            this.logger.error(`Redis connection error: ${err.message}`);
        });
    };


};

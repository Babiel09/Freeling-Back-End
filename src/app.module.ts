import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ServicesModule } from './services/services.module';
import { TagsModule } from './tags/tags.module';
import { PrismaModule } from 'prisma/prisma.module';
import { BullModule } from '@nestjs/bull';
import { USER_QUEUE } from './constants/constants';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule, 
    ServicesModule, 
    TagsModule, 
    PrismaModule,
    BullModule.forRoot({
      redis:{
        host:process.env.REDIS_HOST,
        port:Number(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({
      name:USER_QUEUE
    }),
    RedisModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

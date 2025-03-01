import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RedisModule } from 'src/redis/redis.module';
import { BullModule } from '@nestjs/bull';
import { USER_QUEUE } from 'src/constants/constants';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports:[
    RedisModule,
    PrismaModule,
    BullModule.registerQueue({
      name:USER_QUEUE,
    }),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

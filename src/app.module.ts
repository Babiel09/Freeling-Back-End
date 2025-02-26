import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ServicesModule } from './services/services.module';
import { TagsModule } from './tags/tags.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [UserModule, ServicesModule, TagsModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

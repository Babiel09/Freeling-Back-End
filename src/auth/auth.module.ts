import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    UserModule,
  JwtModule.register({
    secret:process.env.JWT_SECRET,
    signOptions:{
      expiresIn:"30 days"
    }
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

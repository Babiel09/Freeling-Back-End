import { HttpException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    private logger = new Logger(AuthService.name);
    constructor(private jwtService:JwtService, private userService:UserService){};

    public async login(email:string,password:string){
        try{
            const userFindedByEmail = await this.userService.findUserByEmail(email);

            const verifyPassword = await bcrypt.verifyPassword(password,userFindedByEmail.password);

            if(verifyPassword){
                this.logger.error("Invalid creentials!");
                throw new HttpException("Invalid creentials!",401);
            };

            const payload:object = {
                id:userFindedByEmail.id,
                name:userFindedByEmail.name,
                email:userFindedByEmail.email,
                password:userFindedByEmail.password,
                photo:userFindedByEmail.photo,
                workName:userFindedByEmail.workName
            };

            const createToken = await this.jwtService.signAsync(payload);

            this.logger.debug(`\n \n TOKEN: \n \n ${createToken} \n \n`)

            return JSON.parse(createToken);

        }catch(err){
            this.logger.error(err.message);
            throw new HttpException(err.message,err.status);
        };
    };
};

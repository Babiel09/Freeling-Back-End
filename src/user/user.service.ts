import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from 'prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';
import { CreateUserDTO } from './DTO/user.create.dto';

@Injectable()
export class UserService {
    private prisma: Prisma.UserDelegate<DefaultArgs, Prisma.PrismaClientOptions>;
    private logger = new Logger(UserService.name)
    constructor(private pr:PrismaService,private redisService:RedisService){
        this.prisma = pr.user;
    };

    private async verifyUserId(id:number){
        try{
            const findUser = await this.prisma.findUnique({
                where:{
                    id:Number(id)
                },
            });

            return findUser;
        }catch(err){
            this.logger.error(err.message);
            throw new HttpException(err.message,err.status);
        };
    };

    public async showAllUsers():Promise<User[]>{
        try{
            const allUsersInCache = await this.redisService.get("users");
            if(!allUsersInCache){
                this.logger.warn("No users in cache!");
                const allUsers = await this.prisma.findMany();
                if(!allUsers){
                    this.logger.error("Unxpected error to get all users in the Data Base, please verify if your DB is on.");
                    throw new HttpException("Unxpected error to get all users in the Data Base, please verify if your DB is on.",500)
                };
                const addUsersInCache = await this.redisService.set(
                    "users",
                    JSON.stringify(allUsers),
                    "EX",
                    60
                );

                if(!addUsersInCache){
                    this.logger.error("Unxpected error to add all users in the Cache, please verify if your Redis is on.");
                    throw new HttpException("Unxpected error to add all users in the Cache, please verify if your Redis is on.",500)
                };

                return allUsers;
            };
            return JSON.parse(allUsersInCache);
        } catch(err){
            this.logger.error(err.message);
            throw new HttpException(err.message,err.status);
        };
    };

    public async findSpecifiedUser(id:number):Promise<User>{
        try{
            const userInCache = await this.redisService.get("user-specified");

            if(!userInCache){
                const tryToFindUser = await this.verifyUserId(id);

                const addUserToCache = await this.redisService.set(
                    "user-specified",
                    JSON.stringify(tryToFindUser),
                    "EX",
                    15
                );

                if(!addUserToCache){
                    this.logger.error("We can't add the specified user to the cache!");
                    throw new HttpException("We can't add the specified user to the cache!",500);
                };

                return tryToFindUser;
            };
            return JSON.parse(userInCache);
        }catch(err){
            this.logger.error(err.message);
            throw new HttpException(err.message,err.status);
        };
    };

    public async deleteSpecifiedUser(id:number){
        try{
            const tryToFindUser = await this.verifyUserId(id);

            const tryToDeleteUser = await this.prisma.delete({
                where:{
                    id:Number(tryToFindUser.id)
                },
            });

            if(!tryToDeleteUser){
                this.logger.error("We can't delete the user!");
                throw new HttpException("We can't delete the user, please verify the user id!",400);
            };

            const tryToDeleteServices = await this.pr.services.delete({
                where:{
                    userId:Number(tryToDeleteUser.id)
                },
            });

            if(!tryToDeleteServices){
                throw new HttpException("User Deleted!",204)
            };
            
            const tryToDeleteRecomendations = await this.pr.recomendation.delete({
                where:{
                    userId:Number(tryToDeleteUser.id)
                },
            });
            
            if(!tryToDeleteRecomendations){
                throw new HttpException("User Deleted!",204)
            };
            
            const tryToDeleteTags = await this.pr.tags.delete({
                where:{
                    serviceId:Number(tryToDeleteServices.id)
                },
            });

            if(!tryToDeleteTags){
                throw new HttpException("Service Deleted!",204)
            };

        }catch(err){
            this.logger.error(err.message);
            throw new HttpException(err.message,err.status);
        };
    };

    public async insertUser(data:CreateUserDTO):Promise<User>{
        try{
            const tryToCreateUser = await this.prisma.create({
                data:{
                    name:data.name,
                    email:data.email,
                    password:data.password,
                    workName:data.workName,
                    photo:"",
                    rate:0
                }
            });

            if(!tryToCreateUser){
                this.logger.error("We can't create the user!");
                throw new HttpException("We can't create the user!",500);
            };

            return tryToCreateUser;
        }catch(err){
            this.logger.error(err.message);
            throw new HttpException(err.message,err.status);
        };
    };

};

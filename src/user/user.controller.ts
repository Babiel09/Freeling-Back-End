import { Body, Controller, Delete, Get, HttpException, Logger, Param, Post, Put, Res } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { CreateUserDTO } from './DTO/user.create.dto';
@Controller('user')
export class UserController {
private logger = new Logger(UserController.name)
  constructor(private userService:UserService){};  

    private async randomizeHash(stringToHash:string){
        const saltArray:number[] = [12,14,16,18,20,22,24,26,28,30,32,34,36,38,40];
        let salt:number =  Math.floor(Math.random() * saltArray.length);
        let realHash = await bcrypt.hash(stringToHash,salt);
        return realHash; 
    };

  @Get("/v1/allUsers")
  private async getUsers(@Res()res:Response):Promise<Response>{
    try{
        const allUsers = await this.userService.showAllUsers();

        return res.status(200).send(allUsers)
    } catch(err){
    this.logger.error(err.message);
    throw new HttpException(err.message,err.status);
    };
  };

  @Post("/v1/newUser")
  private async createUser(@Body()data:CreateUserDTO,@Res()res:Response):Promise<Response>{
    try{

        const realPassword = await this.randomizeHash(data.password);

        data.password = realPassword;

        const createUser = await this.userService.insertUser(data);

        return res.status(201).send(createUser);
    }catch(err){
    this.logger.error(err.message);
    throw new HttpException(err.message,err.status);
    };
  };

  @Get("/v1/specificUser/:id")
  private async getSpecificUser(@Res()res:Response,@Param("id")id:number):Promise<Response>{
    try{
      const specifiedUser = await this.userService.findSpecifiedUser(id);

      return res.status(200).send(specifiedUser);
    }catch(err){
    this.logger.error(err.message);
    throw new HttpException(err.message,err.status);
    };
  };

  @Delete("/v1/specificUserToDie/:id")
  private async deleteUser(@Res()res:Response,@Param("id")id:number):Promise<Response>{
    try{
      const userToDelete = await this.userService.deleteSpecifiedUser(id);

      return res.status(204).send(userToDelete);
    }catch(err){
    this.logger.error(err.message);
    throw new HttpException(err.message,err.status);
    };
  };

  //Essa rota não permite mudar a senha
  @Put("/v1/specificUserToUpdate/:id")
  private async updateUser(@Res()res:Response,@Param("id")id:number,@Body()data:CreateUserDTO):Promise<Response>{
    try{
      const userToUpdate = await this.userService.updateUser(id,data);

      return res.status(200).send(userToUpdate);
    }catch(err){
    this.logger.error(err.message);
    throw new HttpException(err.message,err.status);
    };
  };

};

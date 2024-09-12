import {
  Body,
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AppService, DataService, UserService } from './app.service';
import { User } from './entities/user.entities';
import { UserDto } from './dto/user.dto';
import { Data } from './entities/data.entities';
import { DataDto } from './dto/data.dto';

//controller invokes function from service

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('findAll')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('findUserAndValidate')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findUserAndValidate(
    @Body() data: UserDto,
  ): Promise<{ message: string; user?: User }> {
    return this.userService.findUserAndValidate(data);
  }

  @Get('findAllUsernames')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAllUsernames(): Promise<string[] | undefined> {
    return this.userService.findAllUsernames();
  }

  @Post('newUser')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() createUserDto: UserDto): Promise<User | undefined> {
    return this.userService.createUser(createUserDto);
  }
}

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}
  @Get('getAllDataForUser')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllDataForUser(
    @Query('id') id: string,
    @Query('username') username: string,
    @Query('loggedIn') loggedIn: boolean,
  ): Promise<Data[]> {
    return this.dataService.getAllDataForUser({ id, username, loggedIn });
  }

  @Post('saveProgress')
  @UsePipes(new ValidationPipe({ transform: true }))
  async saveProgress(
    @Body() data: DataDto,
  ): Promise<{ message: string; payload?: Data }> {
    try {
      const savedData = await this.dataService.saveProgress(data);
      if (!savedData) {
        throw new Error('Failed to save progress.');
      }
      return { message: 'Progress saved successfully', payload: savedData };
    } catch (error) {
      console.log(error);
    }
  }

  @Put('logOut')
  @UsePipes(new ValidationPipe({ transform: true }))
  async logOut(
    @Body() data: DataDto,
  ): Promise<{ message: string; payload?: Data }> {
    try {
      const logOutUser = await this.dataService.logOut(data);
      if (!logOutUser) {
        throw new Error('Failed to log out');
      }
      return { message: 'User has been logged out', payload: logOutUser };
    } catch (error) {
      console.log(error);
    }
  }
}

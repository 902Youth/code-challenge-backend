import {
  Body,
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
  Post,
} from '@nestjs/common';
import { AppService, DataService, UserService } from './app.service';
import { User } from './entities/user.entities';
import { UserDto } from './dto/user.dto';
import { Data } from './entities/data.entities';

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

  @Get('findUserAndValidate')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findUserAndValidate(
    @Query() query: UserDto,
  ): Promise<{ message: string; user?: User }> {
    return this.userService.findUserAndValidate(query);
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
}

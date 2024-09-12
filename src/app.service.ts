import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { Data } from './entities/data.entities';
import { DataDto } from './dto/data.dto';

//service file holds injectable which are used to define the actual function

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to my API';
  }
}

//USERS

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Data)
    private dataRepository: Repository<Data>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  //add a return of the current answers below

  async findUserAndValidate(
    findUserDto: UserDto,
  ): Promise<{ message: string; user?: User }> {
    const { input, firstName, lastName } = findUserDto;
    let user: User | undefined;

    const isEmail = /\S+@\S+\.\S+/.test(input);
    console.log(isEmail);

    if (isEmail && firstName && lastName) {
      user = await this.usersRepository.findOne({
        where: { email: input, firstName, lastName },
      });
    } else if (firstName && lastName) {
      user = await this.usersRepository.findOne({
        where: { username: input, firstName, lastName },
      });
    }

    if (user) {
      console.log(user);
      const { username, id } = user;
      let userData = await this.dataRepository.findOne({
        where: { id, username },
      });

      if (!userData) {
        console.log('line 62');
        userData = this.dataRepository.create({
          id,
          username,
          loggedIn: true,
        });
      } else {
        console.log('line 69');
        userData.loggedIn = true;
      }

      await this.dataRepository.save(userData);

      return { message: 'User found and logged in', user };
    }

    throw new Error('User not found');
  }

  async findAllUsernames(): Promise<string[]> {
    const users = await this.findAll();
    if (users.length > 0) {
      return users.map((user) => user.username);
    }
    return;
  }

  async createUser(createUserDto: UserDto): Promise<User | undefined> {
    const { username, firstName, lastName, email, position } = createUserDto;

    if (username && firstName && lastName && email) {
      const user = this.usersRepository.create({
        username,
        firstName,
        lastName,
        email,
        position,
      });

      return this.usersRepository.save(user);
    }
    throw new Error('Could not create new user');
  }
}

//DATA

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Data)
    private dataRepository: Repository<Data>,
  ) {}

  async saveProgress(saveProgressDto: DataDto): Promise<Data | undefined> {
    const { logicQuestions, username, codeChallenge } = saveProgressDto;

    const userData = await this.dataRepository.findOne({
      where: { username },
    });

    if (!userData) {
      throw new Error('User not found.');
    }

    userData.logicQuestions = logicQuestions;
    userData.codeChallenge = codeChallenge;

    return this.dataRepository.save(userData);
  }

  async getAllDataForUser(dataDto: {
    id: string;
    username: string;
    loggedIn: boolean;
  }): Promise<Data[]> {
    const { id, username, loggedIn } = dataDto;

    if (loggedIn) {
      return this.dataRepository.find({
        where: [{ id, username }],
      });
    }

    throw new Error('User is not logged in.');
  }

  async logOut(dataDto: {
    id: string;
    username: string;
    loggedIn: boolean;
  }): Promise<Data | undefined> {
    const { id, username, loggedIn } = dataDto;

    if (loggedIn) {
      const userInfo = await this.dataRepository.findOne({
        where: { id, username },
      });

      if (userInfo) {
        userInfo.loggedIn = false;

        await this.dataRepository.save(userInfo);

        return userInfo;
      }
    }

    return undefined;
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/app.controller';
import { UserService } from 'src/app.service';
import { Data } from 'src/entities/data.entities';
import { User } from 'src/entities/user.entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Data])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

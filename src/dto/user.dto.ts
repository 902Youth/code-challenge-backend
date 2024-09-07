import { IsUUID, IsString, IsEmail } from 'class-validator';

export class UserDto {
  @IsUUID()
  id: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  input: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  position: string;
}

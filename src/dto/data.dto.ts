import { IsUUID, IsString, IsBoolean, IsOptional } from 'class-validator';

export class DataDto {
  @IsUUID()
  id: string;

  @IsString()
  username: string;

  @IsBoolean()
  loggedIn: boolean;

  @IsOptional()
  logicQuestions?: any;

  @IsOptional()
  codeChallenge?: string;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

//entity represents a table in our database

@Entity()
export class Data {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  loggedIn: boolean;

  @Column('jsonb', { nullable: true })
  logicQuestions: any;

  @Column('jsonb', { nullable: true })
  codeChallenge: any;
}

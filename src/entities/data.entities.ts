import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

//entity represents a table in our database

@Entity()
export class Data {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  loggedIn: boolean;

  @Column('jsonb', { nullable: true })
  logicQuestions?: any;

  @Column({ nullable: true })
  codeChallenge?: string;
}

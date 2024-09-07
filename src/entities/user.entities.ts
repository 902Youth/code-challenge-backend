import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

//entity represents a table in our database

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  position: string;
}

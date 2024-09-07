import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user.module';
import { DataModule } from './modules/data.module';
import { User } from './entities/user.entities';
import { Data } from './entities/data.entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Data],
      synchronize: true,
      ssl:
        process.env.SSL === 'require' ? { rejectUnauthorized: false } : false,
    }),
    UserModule,
    DataModule,
  ],
})
export class AppModule {}

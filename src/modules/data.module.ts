import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataController } from 'src/app.controller';
import { DataService } from 'src/app.service';
import { Data } from 'src/entities/data.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Data])],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}

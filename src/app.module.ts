import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOption } from './typeOrm.config';

@Module({
  imports: [TypeOrmModule.forRoot(DataSourceOption)],
})
export class AppModule {}

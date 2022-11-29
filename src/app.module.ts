import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOption } from './typeOrm.config';
import { FileModule } from './app/file/file.module';

@Module({
  imports: [FileModule, TypeOrmModule.forRoot(DataSourceOption)],
})
export class AppModule {}

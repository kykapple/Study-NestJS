import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeORMConfig} from "./config/typeorm.config";

@Module({
  imports: [
      TypeOrmModule.forRoot(typeORMConfig),
      BoardModule
  ],
})
export class AppModule {}

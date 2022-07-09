import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot( process.env.DB , { useNewUrlParser: true, useUnifiedTopology: true }), RestaurantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

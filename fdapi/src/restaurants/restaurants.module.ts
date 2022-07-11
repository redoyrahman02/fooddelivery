import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { restaurantsSchema } from './schemas/restaurants.schema';
import { menuSchema } from './schemas/menu.schema';
import { usersSchema } from './schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'restaurantsSchema', schema: restaurantsSchema },
    { name: 'usersSchema', schema: usersSchema },   
    { name: 'menuSchema', schema: menuSchema },  
  ])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService]
})
export class RestaurantsModule {}

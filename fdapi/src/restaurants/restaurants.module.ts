import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { restaurantsSchema } from './schemas/restaurants.schema';
import { usersSchema } from './schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'restaurantsSchema', schema: restaurantsSchema },
    { name: 'usersSchema', schema: usersSchema },    
  ])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService]
})
export class RestaurantsModule {}

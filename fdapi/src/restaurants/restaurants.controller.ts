import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  
  @Post()
  findOpenRestaurants(@Body() postData: any ){

  }

  @Post()
  searchRestanrants(@Body() postData: any ){

  }

  @Post()
  purchaseDishFromRestaurant(){
    
  }

  @Post()
  topRestaurants(){

  }
  
}

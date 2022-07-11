import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}
  
  @Post('/fineOpenRestaurants')
  async findOpenRestaurants(@Body() postData: any ){
    return await this.restaurantsService.findAll(postData);
  }

  @Post('/searchRestaurants')
  async searchRestanrants(@Body() postData: any ){
    return await this.restaurantsService.searchRestaurants( postData );
  }

  @Post('/purchaseDishFromRestaurant')
  async purchaseDishFromRestaurant(@Body() postData: any ){
    
  }

  @Post('/topRestaurants')
  async topRestaurants(@Body() postData: any ){
    return await this.restaurantsService.topRestaurants( postData );
  }

  @Post('/load/restaurantsData')
  async loadRestaurants(@Body() postData: any ){
    return await this.restaurantsService.loadRestaurants( postData); 
  }

  @Post('/load/users')
  async loadUsers(@Body() postData: any ){
    return await this.restaurantsService.loadUsers( postData);
  }
  
}

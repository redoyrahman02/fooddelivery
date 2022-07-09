import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { restaurantsInterface } from './interfaces/restaurants.interface';
import { usersInterface } from './interfaces/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
const fs = require('fs');

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel('restaurantsSchema') private restaurantsModel: Model<restaurantsInterface>,
    @InjectModel('usersSchema') private usersModel: Model<usersInterface>,
  ){}

  create(createRestaurantDto: CreateRestaurantDto) {
    return 'This action adds a new restaurant';
  }

  //finds all the restaurants
  async findAll( postData: any ) {

    const restaurants = await this.restaurantsModel.find(); 

    return {'message': 'All Open Restaurants ', 'status': 200, 'data': restaurants };
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
  //load restaurants 
  async loadRestaurants( postData: any){

    const filePath = 'src/restaurants/data/restaurants.json'; 

    // Calling the readFileSync() method
    // to read 'input.txt' file
    const data = fs.readFileSync( filePath ,
    {encoding:'utf8', flag:'r'});

    // Display the file data
    
    if( data ){
      const jsonData = JSON.parse( data ) ; 

      // console.log( jsonData[0]);
      if( jsonData && Array.isArray( jsonData) ){
        const totalRows = jsonData.length ; 

        for(let i=0 ; i<totalRows ; i++ ){
          let openingHoursArray = [] ; 
          let openingHoursRaw = jsonData[i].openingHours ; 
          let firstSeparator = openingHoursRaw.split('/') ; 

          firstSeparator.map( async (element)=>{
            console.log( element );
            let openingHourObject = {
              day:'', 
              start: 0 , 
              end: 0 
            }; 
            let secondSeparator = element.split('-'); 
            if( secondSeparator && Array.isArray( secondSeparator) ){
              let rowCount = secondSeparator.length ; 
              if( rowCount == 2){

                let firstPart = secondSeparator[0].trim(); 
                let secondPart = secondSeparator[1].trim(); 

                let thirdseparator = firstPart.split(' '); 

                if( thirdseparator && Array.isArray( thirdseparator) ){

                  if( thirdseparator.length==3){
                    
                  }

                  openingHourObject.day = thirdseparator[0].trim().toLowerCase(); 

                  let hour = thirdseparator[1].trim(); 
                  let amOrpm = thirdseparator[2].trim(); 
                  if( amOrpm == 'am'){
                    openingHourObject.start =  this.timeToInt( hour ); 
                  }else{
                    openingHourObject.start = 1200 +  this.timeToInt( hour ); 
                  }

                }
                let endTimeSeparator = secondPart.split(' ');

                if( endTimeSeparator && Array.isArray( endTimeSeparator ) ){
                  let hour = endTimeSeparator[0].trim(); 
                  let amOrpm = endTimeSeparator[1].trim(); 

                  if( amOrpm =='am'){

                    openingHourObject.end = this.timeToInt( hour ) ;

                  }else{
                    
                      openingHourObject.end = 1200 + this.timeToInt( hour );      
                    

                  }
                }
                openingHoursArray.push( openingHourObject );

              }else if( rowCount == 3 ){

              }
            }
          });

          

          let singleData = {
            restaurantName: jsonData[i].restaurantName, 
            openingHours: openingHoursArray, 
            menu: jsonData[i].menu , 
            cashBalance: jsonData[i].cashBalance
          }
          console.log( singleData );
          return '' ; 
          let restaurantModel = new this.restaurantsModel( singleData);

          await restaurantModel.save(); 
        }
      }
    }

  }

  //load users
  async loadUsers( postData: any ){

  }

  timeToInt( time: any){
    let returnInt = 0 ; 
    if( time.includes(':') ){
      returnInt = parseInt( time.replace(':', '') ); 
    }else{
      returnInt = parseInt( time ) * 100 ; 
    }

    return returnInt ; 
  }
}

import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { restaurantsInterface } from './interfaces/restaurants.interface';
import { usersInterface } from './interfaces/users.interface';
import { menuInterface } from './interfaces/menu.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
const fs = require('fs');

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel('restaurantsSchema') private restaurantsModel: Model<restaurantsInterface>,
    @InjectModel('usersSchema') private usersModel: Model<usersInterface>,
    @InjectModel('menuSchema') private menuModel: Model<menuInterface>,
  ){}

  create(createRestaurantDto: CreateRestaurantDto) {
    return 'This action adds a new restaurant';
  }

  //search restaurants
  async searchRestaurants( postData: any ){
    const searchTerm = postData.searchTerm || "coffee"; 
    const restaurants = await this.menuModel.find( { $text: { $search: searchTerm } } ); 

    return {'message': 'All Restaurants ', 'status': 200, 'data': restaurants };
  }

  //purchase a dish 
  async dishPurchase( postData: any){

  }

  //finds all the restaurants
  async findAll( postData: any ) {

    const day = postData.day ; 

    const startTime = postData.startTime ; 

    const endTime = postData.endTime; 

    const restaurants = await this.restaurantsModel.find({ openingHours: {$elemMatch: {"day": day , start: {$gt: startTime } , end: {$lte: endTime } } } }).sort({'restaurantName': 1} ); 

    return {'message': 'All Open Restaurants ', 'status': 200, 'data': restaurants };
  }

  //find top restaurants with x number of dishes on a price range 
  async topRestaurants( postData: any ){

    const dishNumber = postData.dishNumber || 5; 

    const startPrice = postData.startPrice || 10 ; 

    const endPrice = postData.endPrice || 14; 

    const numberOfRestanrantsToShow = 10  ;

    const restaurants = await this.menuModel.aggregate(
      [
        { $match: { price: {$gte: startPrice , $lte: endPrice} } },
        { $group: {
          _id: "$restaurantName", 
          count:{$count: { } }
          
        }},
        { $match: {  count: {$gte: (dishNumber-1), $lte: (dishNumber+1)}  }}
      ]
      ).sort({'_id': 1 } ).limit( numberOfRestanrantsToShow); 

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
                let hour = ''; 
                let amOrpm = '' ; 
                let secondDay = false; 
                let secondDayValue = '' ; 
                let multipleDays = []; 

                let thirdseparator = firstPart.split(' '); 

                if( thirdseparator && Array.isArray( thirdseparator) ){

                  if( thirdseparator.length>3 ){

                    for( let j=0 ; j < thirdseparator.length ; j++ ){

                      let word = thirdseparator[j] ; 

                      if( !isNaN( word.charAt(0) ) ){
                        break ; 
                      }
                      multipleDays.push( word.replace(',', ''));
                    }
                    openingHourObject.day = thirdseparator[0].trim().toLowerCase().replace(',', ''); 
                    secondDay = true ; 
                    // secondDayValue = thirdseparator[1].trim().toLowerCase() ; 
                    hour = thirdseparator[multipleDays.length].trim(); 
                    amOrpm = thirdseparator[(multipleDays.length+1)].trim();
                  }else{
                    openingHourObject.day = thirdseparator[0].trim().toLowerCase(); 
                    hour = thirdseparator[1].trim(); 
                    amOrpm = thirdseparator[2].trim();
                  }                  

                   
                  if( amOrpm == 'am'){
                    openingHourObject.start =  this.timeToInt( hour ); 
                  }else{
                    let baseHour = this.timeToInt( hour );
                    if( baseHour > 11 ){
                      openingHourObject.start =   this.timeToInt( hour ); 
                    }else{
                      openingHourObject.start = 1200 +  this.timeToInt( hour ); 
                    }
                    
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
                
                if( secondDay ){
                  for(let j=0 ; j<multipleDays.length ; j++ ){
                    let tmpObject = {
                      day: multipleDays[j], 
                      start: openingHourObject.start, 
                      end: openingHourObject.end 
                    }
                    openingHoursArray.push( tmpObject );
                  }
                  
                }else{
                  // console.log( openingHourObject)
                  openingHoursArray.push( openingHourObject );
                }

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
          jsonData[i].menu.map( async (element) =>{
            element.restaurantName = singleData.restaurantName ; 
            let tmp = new this.menuModel( element ); 
            await tmp.save(); 
          });
          console.log( singleData );
          // return '' ; 
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

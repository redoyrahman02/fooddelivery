import { Document } from 'mongoose';

export interface restaurantsInterface extends Document {
    restaurantName: String;
    openingHours: [
        {
            day: String, 
            start: Number, 
            end: Number
        }
    ];  
    cashBalance: Number;
    menu: [{
        dishName: String, 
        price: Number 
    }];
}
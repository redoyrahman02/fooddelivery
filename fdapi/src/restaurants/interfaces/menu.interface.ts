import { Document } from 'mongoose';

export interface menuInterface extends Document {
    restaurantName: String;
    dishName: String ;  
    price: Number;    
}
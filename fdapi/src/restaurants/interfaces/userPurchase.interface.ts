import { Document } from 'mongoose';

export interface userpurchaseInterface extends Document {
    dishName: String;
    restaurantName: String; 
    userId: Number;
    transactionAmount: Number
}
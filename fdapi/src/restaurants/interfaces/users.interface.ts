import { Document } from 'mongoose';

export interface usersInterface extends Document {
    cashBalance: Number;
    id: Number;
    name: String;
    purchaseHistory: [{
        dishName: String, 
        restaurantName: String, 
        transactionAmount: Number, 
        transactionDate: Date, 
        restaurantId: String  
    }];
}
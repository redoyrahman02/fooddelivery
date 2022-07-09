import * as mongoose from 'mongoose';

export const usersSchema = new mongoose.Schema({
    cashBalance: Number,
    id: Number,
    name: String,
    purchaseHistory: [{
        dishName: String, 
        restaurantName: String, 
        transactionAmount: Number, 
        transactionDate: Date, 
        restaurantId: String  
    }],
},
{
    collection: "users",
    versionKey: false,
    timestamps: true
});
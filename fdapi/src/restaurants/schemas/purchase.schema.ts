import * as mongoose from 'mongoose';

export const userPurchaseSchema = new mongoose.Schema({
    dishName: String,
    restaurantName: String, 
    userId: Number,
    transactionAmount: Number
},
{
    collection: "userPurchase",
    versionKey: false,
    timestamps: true
});
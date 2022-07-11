import * as mongoose from 'mongoose';

export const menuSchema = new mongoose.Schema({
    dishName: String,
    restaurantName: String, 
    price: Number
},
{
    collection: "menu",
    versionKey: false,
    timestamps: true
});
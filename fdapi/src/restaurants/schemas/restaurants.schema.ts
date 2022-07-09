import * as mongoose from 'mongoose';

export const restaurantsSchema = new mongoose.Schema({
    restaurantName: String,
    openingHours: [
        {
            day: String, 
            start: Number, 
            end: Number
        }
    ],  
    menu: [{
        dishName: String, 
        price: Number 
    }],
    cashBalance: Number
},
{
    collection: "restaurants",
    versionKey: false,
    timestamps: true
});
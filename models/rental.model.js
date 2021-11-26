const Joi = require('joi');
const {mongoose} = require('./conection.db');


const Rental = mongoose.model('rentals', new mongoose.Schema({
    customer: {
        name: {
            type: String,
            required: true
        },
        isGold: {
            type: Boolean,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    movie:{
        title:{
            type:String,
            required:true
        },
        dailyRentalRate:{
            type:Number,
            required:true
        }
    },
    dateOut:{
        type:Date,
        required: true
    },
    returnDate:{
        type:Date,
        required:true
    },
    rentalFee:{
        type:Number,
        required:true
    }
}))

module.exports = Rental
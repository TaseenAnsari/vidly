const {mongoose} = require('./conection.db');
const movie = mongoose.model('movies', new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    genre:{
        type:String
    },
    numberInStock:{
        type:Number,
        max:100,
        required:true
    },
    dailyRentalRate:{
        type:Number,
        required:true
    }
}))

module.exports = movie
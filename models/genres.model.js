const {mongoose} = require('./conection.db');

const genre = mongoose.model('genres',new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
}))

module.exports = genre
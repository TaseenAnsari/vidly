const {mongoose} = require('./conection.db');
const Joi = require('joi')
const uniqueValidation = require('mongoose-unique-validator')

const customer = mongoose.model('customers', new mongoose.Schema({
    name:{
        type:String,
        default:"Anonamous"
    },
    isGold:{
        type:Boolean,
        default:false
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:4,
        maxlength:25,
    },
    password:{
        type: String,
        required:true  
    },
    admin:{
        type: Boolean,
        default:false
    }

}))

customer.schema.plugin(uniqueValidation) //validate Email as unique object

const customerValidate = Joi.object({
    name: Joi.string()
    .min(4)
    .max(20),
    isGold: Joi.boolean(),
    email:Joi.string().email().required()
    .required(),
    password: Joi.string().min(8).required(),
    admin: Joi.boolean()
})


module.exports.customerValidate = customerValidate 
module.exports.customers = customer
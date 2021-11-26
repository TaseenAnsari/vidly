const { customerValidate } = require('../models/customers.model');


module.exports = async(req , res , next)=>{
    const data = req.body
        const { error, value } = customerValidate.validate(data)
        if (error) return res.status(400).send(error.message)
        next();
}
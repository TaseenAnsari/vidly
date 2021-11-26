const {customers} = require('../models/customers.model')
module.exports =async (req, res, next) => {
    try{
    const user = await  customers.find({email:req.body.email.email})
    if(!user[0].admin) return res.status(401).send("Access Denied");
    next()
    }
    catch(err){
        return res.status(401).send(err.message)
    }

}
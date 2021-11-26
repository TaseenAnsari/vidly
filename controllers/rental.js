const rental = require('../models/rental.model');
const {customers} = require('../models/customers.model')
const movies = require('../models/movies.model')
const { mongoose} = require('../models/conection.db')

async function getRental(req , res , next) {
    try {
        const user = await customers.find({email:req.body.email}).select('-password')
        if(!user[0].admin) return res.send(await rental.find(req.query.customer));
        return res.send(await rental.find({email:user[0].email}))
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}


async function addRental(req , res , next) {
    try {
        const email = req.body.email
        const customer = await customers.find({ email })
        .select('-password -_id -admin -__v');
        const movie = await movies.find({ _id: mongoose.Types.ObjectId(req.params.id) })
        .select('-genre -numberInStock -_id -__v');
        if (!customer[0].isGold) return res.status(404).send("Customer is not Gold member")
        if (movie[0].numberInStock === 0) return res.status(404).send("Movies out of stock")
  
        const result = new rental({
            customer: 
            // customer[0],
            {
                name: customer[0].name,
                isGold: customer[0].isGold,
                email: customer[0].email
            },
            movie:
            {
                title: movie[0].title,
                dailyRentalRate: movie[0].dailyRentalRate
            },
            dateOut: req.body.ndate,
            returnDate: req.body.rdate,
            rentalFee:req.body.period * Number(movie[0].dailyRentalRate)
        })
        movies.updateOne({_id: mongoose.Types.ObjectId(req.params.id)},{
            $inc:{
                numberInStock:-1
            }
        })
        await result.save()
        return res.send(result);
        
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

async function updateRental(req , res ,next) {
    try {
        res.send(await rental.updateOne({ _id: req.params.id }, { $set: req.body }));
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}
async function deleteRental(req , res ,next) {
    try {
        res.send(await rental.deleteOne({ _id: req.params.id }));
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports.getRental = getRental;
module.exports.addRental = addRental;
module.exports.updateRental = updateRental;
module.exports.deleteRental = deleteRental;


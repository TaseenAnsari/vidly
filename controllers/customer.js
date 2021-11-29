const { customers, customerValidate } = require('../models/customers.model');
const _ = require('lodash')
const { encryptPassword, decryptPassword, generateToken, verifyToken } = require('../auth/auth');


async function getCustomer(req, res, next) {
    try {
        if(!req.body.email.email) return res.status(401).send("no email avalable")
        const user = await customers.find({email:req.body.email.email}) //same
        if(!user[0]) return res.status(401).send("Authentication Failed")
        if(!user[0].admin) return res.send(user[0]);
        return res.send(await customers.find(req.query).select("-password"))

    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

async function addCustomer(req, res, next) {
    try {
        const data = req.body
        data.password = await encryptPassword(data.password)
        const result = new customers(data)
        await result.save()
        res.send(JSON.stringify(_.pick(result, ['name', 'isGold', 'email'])) + "You have succesfully register");
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

async function updateCustomer(req, res, next) {
    try {
        console.log(req.body.email.email)
        const user = await customers.find({email:req.body.email.email}) //same
        await customers.updateOne({ _id: user[0]._id }, { $set: {
            name:req.body.name | user[0].name
        } });
        res.send("update Successfully")
    }

    catch (err) {
        res.status(400).send(err.message)
    }
}

async function deleteCustomer(req, res, next) {
    try {
        res.send(await customers.deleteOne({ _id: req.params.id }))
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

async function loginCustomer(req, res, next) {
    try {
        const result = await customers.find({ email: req.body.email }).select('email password'); //same
        if (!result[0]) return res.status(401).send("email doesn't exist")
        if (await decryptPassword(req.body.password, result[0].password)) {
            return res.send({token :await generateToken(req.body)})
        }
        else {
            return res.status(401).send("password miss matched");
        }

    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports.getCustomer = getCustomer;
module.exports.addCustomer = addCustomer;
module.exports.updateCustomer = updateCustomer;
module.exports.deleteCustomer = deleteCustomer;
module.exports.loginCustomer = loginCustomer;


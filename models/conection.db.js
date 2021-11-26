
const Fawn = require("fawn");
const mongoose = require('mongoose');
const config = require('config')

mongoose.connect(config.get('db'))
.then(()=>console.log("connect to mongodb",config.get('db')))
.catch((err)=>console.error(err.message));

Fawn.init(config.get('db'))




module.exports.mongoose = mongoose;
module.exports.Fawn = Fawn;
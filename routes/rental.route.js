const express = require('express')
const {getRental,updateRental,deleteRental,addRental} = require('../controllers/rental')
const route = express.Router();
const validateObjectId = require('../middlewares/validateObjectId')
const validateToken = require('../middlewares/validateToken')
const validateAdmin = require('../middlewares/validateAdmin')
const getperiod = require('../middlewares/getPeriod')


route.get('/',validateToken,getRental);


route.post('/:id',validateObjectId,validateToken,getperiod,addRental)

route.put('/:id',validateObjectId,validateToken,validateAdmin,updateRental)

route.delete('/:id',validateObjectId,validateToken,validateAdmin,deleteRental)


module.exports = route
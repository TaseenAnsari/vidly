const express = require('express')
const {getCustomer,updateCustomer,deleteCustomer,addCustomer, loginCustomer} = require('../controllers/customer')
const router = express.Router();
const validateObjectId = require('../middlewares/validateObjectId')
const validateToken = require('../middlewares/validateToken');
const validateAdmin = require('../middlewares/validateAdmin');
const validateCustomer = require('../middlewares/validateCustomer');



router.get('/',validateToken,getCustomer)

router.post('/login',loginCustomer) //generate token for authorization

router.post('/',validateCustomer,addCustomer); //register new customer

router.put('/',validateToken,updateCustomer)

router.delete('/:id',validateObjectId,validateToken,validateAdmin,deleteCustomer) //this request is only for admin


module.exports = router
const express = require('express')
const {getMovie,updateMovie,deleteMovie,addMovie} = require('../controllers/movie')
const validateAdmin = require('../middlewares/validateAdmin')
const validateToken = require('../middlewares/validateToken')
const validateObjectId = require('../middlewares/validateObjectId')
const route = express.Router();



route.get('/',validateToken,getMovie)

route.post('/',validateToken,validateAdmin,addMovie)

route.put('/:id',validateToken,validateAdmin,validateObjectId,updateMovie)

route.delete('/:id',validateToken,validateAdmin,validateObjectId,deleteMovie)


module.exports = route
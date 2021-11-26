const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const config = require('config')

exports.encryptPassword = async function encryptPassword(password){
    try{
    return await bcrypt.hash(password,10);
    }
    catch(err){
        console.log(err.message)
    }
}
exports.decryptPassword = async function encryptPassword(password1,password2){
   try{
    return await bcrypt.compare(password1,password2)
    }
    catch(err){
        console.log(err.message)
    }
}

exports.generateToken = async (data) => {
    return await Jwt.sign(data,config.get('jwtPrivateKey'));
}

exports.verifyToken = async (token) => {
    return await Jwt.verify(token,config.get('jwtPrivateKey'));
}
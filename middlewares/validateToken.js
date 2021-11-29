const {verifyToken} = require('../auth/auth')

module.exports =async (req, res, next) => {
    try{
        const token = req.header('x-auth-token');
        if (!token) return res.status(404).send("No Token found")
        const email = await verifyToken(token);
        if (!email) return res.status(401).send("Invalid Token");
        req.body.email = email
    next()
    }
    catch(err){
        return res.status(401).send(err.message)
    }

}
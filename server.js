const express = require('express')
const app = express();
require('./starter/start')(app,express);

const PORT = process.env.PORT || 8333;
app.get('/',(req ,res)=>{
    res.send("hello")
})

server = app.listen(PORT,()=>{ console.log("connected to localhost@",PORT)})

module.exports = server
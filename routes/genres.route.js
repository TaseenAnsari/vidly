const express = require('express')
const {getGenre,updateGenre,deleteGenre,addGenre} = require('../controllers/genre')
const route = express.Router();



route.get('/',async (req,res)=>{
    const result = await getGenre(req.query)
    res.status(200).send(result);
})


route.post('/',async(req,res)=>{
    const result = await addGenre(req.body)
    res.status(200).send(result);
})

route.put('/:id',async (req,res)=>{
    const result = await updateGenre(req.params.id,req.query)
    res.status(200).send(result);
})

route.delete('/:id',async (req,res)=>{
    const result = await deleteGenre(req.params.id)
    res.status(200).send(result);
})


module.exports = route
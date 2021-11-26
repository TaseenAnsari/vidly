const movie = require('../models/movies.model');

async function getMovie(req , res , next) {
    try {
        if (!req.query) res.send(await movie.find({}).select());
        res.send(await movie.find(req.query).select())
    }
    catch(err){
        res.status(400).send(err.message);
    }
}

async function addMovie(req ,res ,next) {
    try {
        const result = new movie(req.body)
        res.status(200).send(await result.save());
    }
    catch(err){
        res.status(400).send(err.message);
    }
}

async function updateMovie(req , res ,next) {
    try {
        res.send(await movie.updateOne({_id:req.params.id},{$set:req.body})); 
    }
    catch(err){
        res.status(400).send(err.message);
    }
}
async function deleteMovie(req , res , next) {
    try {
        res.send(await movie.deleteOne({_id:req.params.id})); 
    }
    catch(err){
        res.status(400).send(err.message);
    }
}

module.exports.getMovie = getMovie;
module.exports.addMovie = addMovie;
module.exports.updateMovie = updateMovie;
module.exports.deleteMovie = deleteMovie;


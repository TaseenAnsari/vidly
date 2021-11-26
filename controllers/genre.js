const genre = require('../models/genres.model');

async function getGenre(querry) {
    try {
        if (!querry) return await genre.find().select();
        return await genre.find(querry).select()
    }
    catch(err){
        console.log(err.message)
    }
}

async function addGenre(data) {
    try {
        const result = new genre(data)
        return await result.save()
    }
    catch(err){
        console.log(err.message)
    }
}

async function updateGenre(id,data) {
    try {
        return await genre.updateOne({_id:id},{$set:data}); 
    }
    catch(err){
        console.log(err.message)
    }
}
async function deleteGenre(id) {
    try {
        return await genre.deleteOne({_id:id}); 
    }
    catch(err){
        console.log(err.message)
    }
}

module.exports.getGenre = getGenre;
module.exports.addGenre = addGenre;
module.exports.updateGenre = updateGenre;
module.exports.deleteGenre = deleteGenre;


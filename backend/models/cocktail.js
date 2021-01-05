const { Schema, model } = require("mongoose");

const cocktailSchema = Schema({
    name: {type: String, required: true},
    ingredients: [{type: String, required: true}],
    directions: {type: String, required: true},
    // image: {type: String},
    // tags: [{type: String}] 
})

module.exports = model('Cocktail', cocktailSchema)
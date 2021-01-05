const express = require('express');
const cocktails = express.Router();
const Cocktail = require('../models/cocktail.js');

cocktails.put('/shippinglist', async (req, res) => {
    try {
        const listOfCocktails = await cocktail.find({});
        res.status(200).json(listOfCocktails);
    }catch (error) {
        res.status(400).json(error);
    }
});

// ===================================================================
// INDEX
// DISPLAY ALL OF A LIST OF RESOURCES
// ===================================================================
cocktails.get('/', async (req, res) => {
    try {
        //attempt to grab all the cocktails from the db
        const foundCocktails = await Cocktail.find({});
        res.status(200).json(foundCocktails);
    } catch(error){
        //this is where we will handle the error if we get one
        res.status(400).json(error)

    }
});
// ===================================================================
// DELETE
// DESTROY RESOURCE
// ===================================================================
cocktails.delete('/:id',  async (req, res) => {
    try {
    const deletedCocktail = await Cocktail.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedCocktail);
} catch (error) {
    res.status(400).json({msg: error.message})   
    }
})
// ===================================================================
// UPDATE
//UPDATE RESOURCE
// ===================================================================
cocktails.put('/:id', async (req, res) => {
    try {
        const updatedCocktail = await Cocktail.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedCocktail);
    } catch (error) {
        res.status(400).json(error);
    }
});
// ===================================================================
// CREATE 
// CREATE A NEW RESOURCE
// notes: async/awaye wait for create to finish before moving to the next command //// working with JSON data from an API now, so you need the async/await keywords so that the Promise object can fulfill it’s promise, once it does, it returns a response object
// ===================================================================
cocktails.post('/', async (req, res) => {
    const x = req.body.ingredients.split(",").map(item => item.trim());
    req.body.ingredients = x
    console.log(req.body)

    try{
        const createdCocktail = await Cocktail.create(req.body)
        // createdCocktail.ingredients.split(',')
        res.status(200).json(createdCocktail)
        console.log(createdCocktail)
    } catch (error) {
        res.status(400).json(error)
    }
})
// ===================================================================
// SHOW 
// DISPLAY AN INDIVIDUAL RESOURCE
// ===================================================================
cocktails.get('/:id', async (req, res) => {
    try {
    const showCocktail = await Cocktail.findById(req.params.id);
    res.status(200).json(showCocktail);
} catch (error) {
    res.status(400).json(error)
    }
})


module.exports = cocktails;
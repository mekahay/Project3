const { Schema, model } = require('mongoose')
const userSchema = Schema ({ 
    username: {type: String, required: true},
    password: {type: String},
    cocktailList: {type: String},
    shoppingList: {type: String}
})

module.exports = model('Users', userSchema)
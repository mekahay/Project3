require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 3000;
const cocktailsController = require("./controllers/cocktails");
//console.log(process.env.MONGO_STRING);
const MONGOSTRING = process.env.MONGO_STRING;
const User = require('./models/user')

const SECRET = 'pourupheadshotsitdownstanduppassoutwakeupfadedfaded'



app.use(cors());
app.use(express.json());


mongoose.connect(MONGOSTRING, {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on("error", (err) => {console.log(err.message)})

mongoose.connection.on("disconnected", () => {console.log('Hey you are diconnected from Mongo')})

mongoose.connection.once("open", () => {console.log('Connected to Mongo')})

app.use("/cocktails", cocktailsController);


app.post('/register', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser)=> {
        if (err){
            res.status(400).json()
        } else {
            res.status(200).json(createdUser)
        }
    })
})


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username })
        if (bcrypt.compareSync(password, user.password)){
            const token = jwt.sign({
                username: user.username
            }, SECRET)
            res.status(200).json({ 
                token,
                username,
                authenticated: true
            })
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = app;

app.listen(PORT, () => {console.log("mixin' drinks on PORT", PORT)});

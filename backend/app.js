require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const cocktailsController = require("./controllers/cocktails");
//console.log(process.env.MONGO_STRING);
const MONGOSTRING = process.env.MONGO_STRING;

app.use(express.json());
app.use(cors());

mongoose.connect(MONGOSTRING, {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on("error", (err) => {console.log(err.message)})

mongoose.connection.on("disconnected", () => {console.log('Hey you are diconnected from Mongo')})

mongoose.connection.once("open", () => {console.log('Connected to Mongo')})

app.use("/cocktails", cocktailsController);

app.listen(PORT, () => {console.log("mixin' drinks on PORT", PORT)});

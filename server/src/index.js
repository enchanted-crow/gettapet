const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan')
require('dotenv').config();

const CategoryRoutes = require("./routes/category");
const PetRoutes = require("./routes/pet");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/public', express.static(path.join(__dirname, 'public')));

//routes
app.use('/api/category', CategoryRoutes);
app.use('/api/pet', PetRoutes);

const mongoUri = process.env.NODE_APP_DB_URI

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
});
mongoose.connection.on('connected', () => {
    console.log("Connected to Mongodb...");
    console.log(`Database: ${mongoUri}`);
})
mongoose.connection.on('error', (err) => {
    console.log("Error connecting to mongo", err);
})
app.listen(4000, () => {
    console.log('App is running on port 4000')
})
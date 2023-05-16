const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan')

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

// const mongoUri = process.env.DATABASE_URL || 'mongodb://0.0.0.0:27017/gettapetDB';
const mongoUri = 'mongodb+srv://admin:nfQmoVWmQhhmU4Qa@atlascluster.dbxtm3e.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
});
mongoose.connection.on('connected', () => {
    console.log("Connected to Mongodb...");
})
mongoose.connection.on('error', (err) => {
    console.log("Error connecting to mongo", err);
})
app.listen(4000, () => {
    console.log('App is running on port 4000')
})
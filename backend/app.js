const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const stuffRoutes = require('./routes/stuff');

require('dotenv').config() // Permet de cacher des informations sensibles/variables d'environnement

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

mongoose.connect('mongodb+srv://'+process.env.Mongo_ID+':'+process.env.Mongo_MP+'@cluster0.cqefr.mongodb.net/'+process.env.Mongo_BDName+'?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes);  

module.exports = app;
const express = require('express')
require('dotenv/config')
const helmet = require('helmet')
const mongoose = require('mongoose')
const path = require('path')
const userRoutes = require('./routes/user') 
const saucesRoutes = require('./routes/sauces')
const app = express()
// ===========================================
mongoose.connect(process.env.DB_CONNECTION,)
.then(() => console.log("Connection à MongoDB ! "))
.catch(error => console.log("Erreur lors de la connection à MongoDB")) 
// ===============================
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json())
app.use('/api/auth', userRoutes)
app.use('/api/sauces', saucesRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(helmet())
// =============================
module.exports = app 
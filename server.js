const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
const __PORT__ = process.env.PORT || 5000;

/**
 * Connecting DB
 */
connectDB();
/**
 * Init middleware
 */
app.use(express.json({extended:false}));
app.get('/',(req,res) => {

       res.send(`API Runing welcome ${process.env.APP_NAME}`);
})
/**
 * define routes
 */
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profiles',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));

app.listen(__PORT__,() => {

      console.log( `Server Started on ${__PORT__} welcome ${process.env.NAME}
      `);
});
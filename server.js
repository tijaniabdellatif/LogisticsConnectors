const express = require('express');
require('dotenv').config();
const app = express();
const __PORT__ = process.env.PORT || 5000;

app.get('/',(req,res) => {

       res.send(`API Runing welcome ${process.env.APP_NAME}`);
})
app.listen(__PORT__,() => {

      console.log( `Server Started on ${__PORT__} welcome ${process.env.NAME}
      `);
});
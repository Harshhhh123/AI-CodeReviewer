const express = require('express');

const aiRoutes = require('./routes/ai.routes');
const { json } = require('stream/consumers');
const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
   res.send("hello")
});


app.use('/ai', aiRoutes);


module.exports = app;
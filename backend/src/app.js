const express = require('express');

const aiRoutes = require('./routes/ai.routes');
const { json } = require('stream/consumers');
const app = express();
const cors = require('cors')
app.use(express.json());


app.use(cors())
app.get('/',(req,res)=>{
   res.send("hello")
});


app.use('/ai', aiRoutes);


module.exports = app;
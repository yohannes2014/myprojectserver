const express = require('express');
const cors = require('cors');
const musicRouter = require('./src/routes/musicRoutes.js');
const mongoose = require('mongoose');


const app = express();
app.use(cors());
 
app.use(express.static('uploads'));   
app.use(express.json()); 
app.use('/api',musicRouter);


const port = process.env.PORT || 7000;

 
mongoose.connect("mongodb+srv://myohannes2010:qdlffXL21aL4r9t5@yohannesmanaye.ionwx.mongodb.net/myproject").then
(()=>console.log(`connected to database`)).catch
((err)=>{console.log(`err:${err}`)}); 



app.listen(port, ()=>console.log(`listining port ${port}`));
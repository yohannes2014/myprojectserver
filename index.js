const express = require('express');
const cors = require('cors');
const musicRouter = require('./src/routes/musicRoutes.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv')


const app = express();
app.use(cors());
dotenv.config(); 
 
app.use(express.static('uploads'));   
app.use(express.json()); 
app.use('/api',musicRouter);


const port = process.env.PORT || 7000;

 
mongoose.connect(process.env.MONGO_URL).then
(()=>console.log(`connected to database`)).catch
((err)=>{console.log(`err:${err}`)}); 



app.listen(port, ()=>console.log(`listining port ${port}`));

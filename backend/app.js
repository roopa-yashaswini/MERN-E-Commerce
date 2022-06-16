const express = require('express')
const bodyParser = require('body-parser')
const productRoutes = require('./routes/product_routes');
const userRoutes = require('./routes/user_routes');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/products', productRoutes);
app.use('/user', userRoutes);

app.use((error, req, res, next) => {
  if(req.file){
      fs.unlink(req.file.path, (err)=>{
          console.log(err);
      })
  }
  if(res.headerSent){
      return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'Unknow error occured'})
})

mongoose.connect('mongodb+srv://roopa:roopa@cluster0.nos9p.mongodb.net/e-commerce?retryWrites=true&w=majority')
.then(() => {
    app.listen(5000);
})
.catch(err => console.log(err))

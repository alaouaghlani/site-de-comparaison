// import express
const express = require('express');
//import the connect file
const app = express();

// import the connect file
const mongoose = require('mongoose');
require('./config/connect');

// import yacht model
const Yacht = require('./models/yacht');

//import multer
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

// import cors
const cors = require('cors');
app.use(cors());

//
app.post('/products', upload.array('images', 10), async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    images: req.files.map((file) => ({
      name: file.originalname,
      data: file.buffer,
      contentType: file.mimetype,
    })),
  });

  await newProduct.save();

  res.send('Product uploaded successfully');
});

//controllers
app.get('/voiliers/', async (req, res) => {
  try {
    const voiliers = await Yacht.find();
    res.send(voiliers);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/voiliers/:id', async (req, res) => {
  try {
    const voilier = await Yacht.findById(req.params.id);
    res.send(voilier);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});

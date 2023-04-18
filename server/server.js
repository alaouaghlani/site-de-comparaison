//import express
const express = require('express');
//import the connect file

require('./config/connect');

const app = express();

app.get('/', (req, res) => {
  res.send('voiliers');
});

app.listen(5000, () => {
  console.log('server work');
});

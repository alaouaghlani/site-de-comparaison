// import required
const express = require('express');
const mongoose = require('mongoose');
require('./config/connect');
const Yacht = require('./models/yacht');
const cors = require('cors');
File = require('./models/files');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
// Middlewares
// app.use(bodyParser.json());
app.use(cors());

// const connection = mongoose.connection;
// let gfs;
// connection.once('open', () => {
//   // Init stream
//   gfs = Grid(connection.db, mongoose.mongo);
//   gfs.collection('fs');
// });

// // Create storage engine
// const storage = new GridFsStorage({
//   url: 'mongodb://localhost/yachtworld',
//   file: (req, file) => {
//     return {
//       filename: file.originalname,
//     };
//   },
// });

// const upload = multer({ storage });

// app.get('/images/:filename', (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     // Check if file exists
//     if (!file || file.length === 0) {
//       return res.status(404).json({
//         err: 'No file exists',
//       });
//     }

//     // Read output to browser
//     const readstream = gfs.createReadStream(file.filename);
//     readstream.pipe(res);
//   });
// });

// app.get('/yachts', (req, res) => {
//   yachts.find({}, (err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// });

//controllers
app.get('/voiliers/', async (req, res) => {
  try {
    const voiliers = await Yacht.find();
    res.send(voiliers);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get voiliers by id
app.get('/voiliers/:id', async (req, res) => {
  try {
    const voilier = await Yacht.findById(req.params.id);
    res.send(voilier);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get random voiliers
app.get('/random-voiliers', async (req, res) => {
  try {
    const randomVoiliers = await Yacht.aggregate([{ $sample: { size: 8 } }]);
    res.send(randomVoiliers);
  } catch (err) {
    res.status(500).send(err);
  }
});

//server port listen
app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});

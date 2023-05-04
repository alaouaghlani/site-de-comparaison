// import express
const express = require('express');
//import the connect file
const app = express();

// import the connect file
const mongoose = require('mongoose');
require('./config/connect');

//import multer
const multer = require('multer');

//import gridfs storage
const { GridFsStorage } = require('multer-gridfs-storage');

const Storage = new GridFsStorage({
  url: 'mongodb+srv://maram:mongodbtrial@cluster0.xus4tzx.mongodb.net/yachtworld',
  file: (req, file) => {
    return {
      bucketName: 'uploads',
      filename: file.originalname,
    };
  },
});
const upload = multer({ Storage });

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

//
const Grid = require('gridfs-stream');

const conn = mongoose.createConnection(
  'mongodb+srv://maram:mongodbtrial@cluster0.xus4tzx.mongodb.net/yachtworld'
);

conn.once('open', () => {
  const gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');

  app.get('/file/:filename', (req, res) => {
    gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          message: 'File not found',
        });
      }

      const readstream = gfs.createReadStream({
        filename: files[0].filename,
      });

      res.set('Content-Type', files[0].contentType);

      return readstream.pipe(res);
    });
  });
});

// import yacht model
const Yacht = require('./models/yacht');

// import cors
const cors = require('cors');
app.use(cors());

//import file
File = require('./models/files');

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

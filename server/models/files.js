const fs = require('fs');
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  length: Number,
  chunkSize: Number,
  uploadDate: Date,
  metadata: {
    yachtId: Number,
  },
});

const File = mongoose.model('fs.files', fileSchema, 'fs.files');

module.exports = File;

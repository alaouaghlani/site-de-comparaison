const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  filename: String,
  contentType: String,
  data: Buffer,
});

module.exports = mongoose.model('File', fileSchema, 'fs.files');

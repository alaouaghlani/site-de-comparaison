const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://maram:mongodbtrial@cluster0.xus4tzx.mongodb.net/YachtInfos',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('connected');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;

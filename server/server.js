// import required
const express = require('express');
const mongoose = require('mongoose');
require('./config/connect');
const Yacht = require('./models/yacht');
const cors = require('cors');
User = require('./models/user');

const app = express();
// Middlewares

app.use(cors());

//controllers
app.get('/voiliers/', async (req, res) => {
  try {
    const voiliers = await Yacht.find();
    res.send(voiliers);
  } catch (err) {
    res.status(500).send(err);
  }
});
//get all names
app.get('/voiliers/names', async (req, res) => {
  try {
    const sailboatNames = await Yacht.find({}, 'Nom');
    const names = sailboatNames.map((sailboat) => sailboat.Nom);
    res.send({ names });
  } catch (err) {
    res.status(500).send(err);
  }
});

// get voiliers by id
app.get('/voiliers/:id', async (req, res) => {
  try {
    const voilier = await Yacht.findById(req.params.id);

    if (!voilier) {
      return res.status(404).send('Sailboat not found');
    }

    // Increment the visitor count
    voilier.visitors++;
    await voilier.save();

    res.send(voilier);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get voilier by name
app.get('/voiliers/name/:name', async (req, res) => {
  try {
    const voilier = await Yacht.findOne({ Nom: req.params.name });

    if (!voilier) {
      return res.status(404).send('Sailboat not found');
    }

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

// // signup user
// app.post('/register', async (req, res) => {
//   data = req.body;

//   usr = new User(data);

//   salt = bcrypt.genSaltSync(10);

//   cryptedpass = await bcrypt.hashSync(data.password, salt);

//   usr.password = cryptedpass;

//   usr
//     .save()

//     .then((saved) => {
//       res.status(200).send(saved);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

// //signin user
// app.post('/login', async (req, res) => {
//   data = req.body;

//   user = await User.findOne({ email: data.email });

//   if (!user) {
//     res.status(404).send('email or password invalid !');
//   } else {
//     validPass = bcrypt.compareSync(data.password, user.password);

//     if (!validPass) {
//       res.status(401).send('email or password invalid ! ');
//     } else {
//       payload = {
//         _id: user._id,
//         email: user.email,
//         name: user.name,
//       };
//       token = jwt.sign(payload, '123456');

//       res.status(200).send({ mytoken: token });
//     }
//   }
// });

//connect button thing
app.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const check = await User.findOne({ email: email });
    if (check) {
      res.json('exist');
    } else {
      res.json('not exist');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Register a new user
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const userData = {
    username: username,
    email: email,
    password: password,
  };

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(409).json({ message: 'User already exists' });
    } else {
      const newUser = new User(userData);
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    }
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Failed to register user' });
  }
});

//server port listen
app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});

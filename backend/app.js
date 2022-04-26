const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to Around-Express Backend!');
});

app.use((req, res, next) => {
  req.user = {
    _id: '6256ab8d8d8c05758da97d8c',
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).json({ message: '404 NOT FOUND' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

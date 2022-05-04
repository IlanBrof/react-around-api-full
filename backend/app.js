const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv').config(); //eslint-disable-line
const cors = require('cors');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const mongoose = require('mongoose');
const auth = require('./middleware/auth');

const app = express();
const { PORT = 3000 } = process.env;
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const validateURL = require('./middleware/validateURL');
const { requestLogger, errorLogger } = require('./middleware/logger');
const serverErr = require('./middleware/errors/Server');

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('Welcome to react-around-api-full Backend!');
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorLogger);
app.use(errors()); // celebrate error handler
app.use(serverErr);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`); //eslint-disable-line
});

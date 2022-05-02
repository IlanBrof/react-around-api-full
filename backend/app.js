const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const auth = require('./middleware/auth');

const app = express();
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { celebrate, Joi, errors } = require('celebrate');
const validateURL = require('./middleware/validateURL');
const { requestLogger, errorLogger } = require('./middleware/logger'); 

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('Welcome to react-around-api-full Backend!');
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
}),createUser);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);

app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);


app.use(errorLogger);
app.use(errors()); // celebrate error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    // check the status and display a message based on it
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

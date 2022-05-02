const mongoose = require('mongoose');
const validatorModule = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },

  about: {
    type: String,
    default: 'Explorer',
    minlength: 2,
    maxlength: 30,
  },

  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator(v) {
        return validatorModule.isURL(v);
      },
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validatorModule.isEmail(v);
      },
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);

const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  patchUserData,
  patchUserAvatar,
  deleteUser,
  getCurrentUser,
} = require('../controllers/users');

// validators
const { celebrate, Joi } = require('celebrate');
const validateURL = require('../middleware/validateURL');

////////////GET REQUESTS////////////
router.get(
  '/',
  celebrate({
    headers: Joi.object().keys({}).unknown(true),
  }),
  getUsers
);

router.get(
  '/me',
  celebrate({
    headers: Joi.object().keys({}).unknown(true),
  }),
  getCurrentUser
);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().hex().length(24),
    }),
    headers: Joi.object().keys({}).unknown(true),
  }),
  getUserById
);
////////////END OF GET REQUESTS////////////

////////////PATCH REQUESTS////////////
router.patch(
  '/me',
  celebrate({
    headers: Joi.object().keys({}).unknown(true),
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  patchUserData
);

router.patch(
  '/me/avatar',
  celebrate({
    headers: Joi.object().keys({}).unknown(true),
    body: Joi.object().keys({
      avatar: Joi.string().custom(validateURL),
    }),
  }),
  patchUserAvatar
);
////////////END OF PATCH REQUESTS////////////

////////////DELETE REQUESTS////////////
router.delete(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().hex().length(24),
    }),
    headers: Joi.object().keys({}).unknown(true),
  }),
  deleteUser
);
////////////END OF DELETE REQUESTS////////////

module.exports = router;

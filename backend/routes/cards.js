const express = require('express');
const { celebrate, Joi } = require('celebrate');
const validateURL = require('../middleware/validateURL');

const router = express.Router();
const {
  getCards,
  getCardById,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');
/// /////////GET REQUESTS////////////
router.get(
  '/',
  celebrate({
    headers: Joi.object().keys({}).unknown(true),
  }),
  getCards,
);

router.get(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().alphanum().hex()
        .length(24),
    }),
    headers: Joi.object().keys({}).unknown(true),
  }),
  getCardById,
);
/// /////////END OF GET REQUESTS////////////

/// /////////POST REQUESTS////////////
router.post(
  '/',
  celebrate({
    headers: Joi.object().keys({}).unknown(true),
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  createCard,
);
/// /////////END OF POST REQUESTS////////////

/// /////////PUT REQUESTS////////////
router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().hex().length(24),
    }),
    headers: Joi.object().keys({}).unknown(true),
  }),
  likeCard,
);
/// /////////END OF PUT REQUESTS////////////

/// /////////DELETE REQUESTS////////////
router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().hex().length(24),
    }),
    headers: Joi.object().keys({}).unknown(true),
  }),
  dislikeCard,
);

router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().alphanum().hex()
        .length(24),
    }),
    headers: Joi.object().keys({}).unknown(true),
  }),
  deleteCard,
);
/// /////////END OF DELETE REQUESTS////////////

module.exports = router;

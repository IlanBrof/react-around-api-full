const Card = require('../models/card');
const NotFoundErr = require('../middleware/errors/NotFound');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    if (!cards) {
      throw new NotFoundErr('Cannot find cards'); // Status(404)
    }
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

const getCardById = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      throw new NotFoundErr('Cannot find card by this ID'); // Status(404)
    }
    res.status(200).send(card);
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const userId = req.user._id;
  try {
    const newCard = await Card.create({
      name,
      link,
      owner: userId,
    });
    if (!newCard) {
      res.json('Error while creating card');
    }
    res.status(200).send(newCard);
  } catch (err) {
    next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
      { new: true },
    );
    if (!like) {
      throw new NotFoundErr('Cannot find card to set like'); // Status(404)
    }
    res.status(200).send(like);
  } catch (err) {
    next(err);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const dislike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // add _id to the array if it's not there yet
      { new: true },
    );
    if (!dislike) {
      throw new NotFoundErr('Cannot find card to set dislike'); // Status(404)
    }
    res.status(200).send(dislike);
  } catch (err) {
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (!card) {
      throw new NotFoundErr('Cannot find card to delete'); // Status(404)
    }
    res.status(200).json(`Card ${card.name} deleted successfully`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCards,
  getCardById,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
};

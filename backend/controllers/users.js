const { NODE_ENV } = process.env;
//JWT_SECRET
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UnauthorizedErr = require('../middleware/errors/Unauthorized');
const BadRequestErr = require('../middleware/errors/BadRequest');
const NotFoundErr = require('../middleware/errors/NotFound');

const User = require('../models/user');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users) {
      throw new NotFoundErr('Users not found'); //StatusCode(404)
    }
    res.send(users);
  } catch (err) {
    // if (err.name === 'CastError') {
    //   res.status(500).json({ message: '1Server error' });
    // }
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user === null) {
      throw new NotFoundErr('User not found'); //StatusCode(404)
      // res.status(404).json({ message: 'user not found' });
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      throw new BadRequestErr('Wrong ID Syntax'); //StatusCode(400)
      // return res.status(500).json({ message: '2Server error' });
    }
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const payload = await jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-key'
    );
    const user = await User.findById(payload._id);
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    if (err.name === 'CastError') {
      throw BadRequestErr('Wrong ID Syntax'); //StatusCode(400)
      // return res.status(400).json({ message: 'ID Does not exist' });
    }
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  const salt = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    if (hashedPassword) {
      const newUser = await User.create({
        name,
        about,
        avatar,
        email,
        password: hashedPassword,
      });
      if (newUser) {
        res.status(201).send(newUser);
      }
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      throw BadRequestErr('Create user validation error'); //StatusCode(400)
      // return res.status(400).json('Create user validation error');
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordValid) {
      throw new UnauthorizedErr('Wrong Email or Password'); //statusCode(401)
    }
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-key',
      { expiresIn: '7d' }
    );
    res.status(200).send({ token });
  } catch (err) {
    next(err);
  }
};

const patchUserAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const updateData = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    );
    if (updateData && avatar) {
      return res
        .status(200)
        .json({ message: 'User avatar patched successfully' });
    }
    throw new NotFoundErr('User not found'); //StatusCode(404)
    // return res.status(404).json({ message: 'User not found' });
  } catch (err) {
    if (err.name === 'CastError') {
      throw new BadRequestErr('Wrong ID Syntax'); //StatusCode(400)
      // return res.status(500).json({ message: '3Server error' });
    }
    next(err);
  }
};

const patchUserData = async (req, res, next) => {
  try {
    const updateData = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    if (updateData && (req.body.name || req.body.about)) {
      return res
        .status(200)
        .json({ message: 'User data patched successfully' });
    }
    throw new NotFoundErr('User not found'); //StatusCode(404)
    // return res.status(404).json({ message: 'User not found' });
  } catch (err) {
    if (err.name === 'CastError') {
      throw new BadRequestErr('Wrong ID Syntax'); //StatusCode(400)
      // return res.status(500).json({ message: '4Server error' });
    }
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deleteData = await User.findByIdAndDelete(req.params.userId);
    if (!deleteData) {
      throw new NotFoundErr('User not found'); //StatusCode(404)
      // res.status(404).json({ message: 'User not found' });
    }
    res.status(200).send(`User ${deleteData.name} deleted successfully`);
  } catch (err) {
    if (err.name === 'CastError') {
      throw new BadRequestErr('Wrong ID Syntax'); //StatusCode(400)
      // return res.status(500).json({ message: '6Server error' });
    }
    next(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  patchUserAvatar,
  patchUserData,
  deleteUser,
  login,
  getCurrentUser,
};

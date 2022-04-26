const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user === null) {
      res.status(404).json({ message: 'user not found' });
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Wrong ID Syntax' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
};

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User.create({ name, about, avatar });
    res.status(200).send(newUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json('Create user validation error');
    }
    return res.status(500).json({ message: 'Server error' });
  }
};

const patchUserAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const updateData = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (updateData && avatar) {
      res.status(200).send('User avatar patched successfully');
    }
    res.status(404).json({ message: 'User not found' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Wrong ID Syntax' });
    }
    if (err.name === 'CastError') {
      return res.status(500).json({ message: 'Server error' });
    }
  }
};

const patchUserData = async (req, res) => {
  try {
    const updateData = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (updateData && (req.body.name || req.body.about)) {
      res.status(200).send('User data patched successfully');
    }
    res.status(404).json({ message: 'User not found' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Wrong ID Syntax' });
    }
    if (err.name === 'CastError') {
      return res.status(500).json({ message: 'Server error' });
    }
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleteData = await User.findByIdAndDelete(req.params.userId);
    if (!deleteData) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).send(`User ${deleteData.name} deleted successfully`);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Wrong ID Syntax' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  patchUserAvatar,
  patchUserData,
  deleteUser,
};

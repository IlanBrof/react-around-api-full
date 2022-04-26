const express = require('express');

const router = express.Router();
const {
  getUsers, getUserById, createUser, patchUserData, patchUserAvatar, deleteUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);

router.post('/', createUser);

router.patch('/me', patchUserData);
router.patch('/me/avatar', patchUserAvatar);

router.delete('/:userId', deleteUser);

module.exports = router;

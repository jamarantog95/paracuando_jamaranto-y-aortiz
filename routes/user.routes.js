const express = require('express');
const passport = require('../libs/passport');
const {
  getUsers,
  getUser,
  updateUser,
} = require('../controllers/user.controller');
const { isAdmin } = require('../middlewares/user.middleware');
const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  getUsers
);

router.get('/:id', passport.authenticate('jwt', { session: false }), getUser);

router.put('/:id', updateUser);

module.exports = router;

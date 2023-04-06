const express = require('express');
const passport = require('../libs/passport');
const {
  getPublications,
  getPublication,
  updatePublication,
  createPublication,
  deletePublication,
  votes,
} = require('../controllers/publications.controller');
const { protectPublication } = require('../middlewares/user.middleware');

const router = express.Router();

router.get('/', getPublications);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  createPublication
);

router.get('/:id', getPublication);

router.put('/:id', updatePublication);

router.delete('/:id', protectPublication, deletePublication);

router.post(
  '/:uuid/vote',
  passport.authenticate('jwt', { session: false }),
  votes
);

module.exports = router;

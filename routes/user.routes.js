const express = require('express')
const { getUsers, getUser, updateUser } = require('../controllers/user.controller');
const { isAdmin } = require('../middlewares/user.middleware');
const router = express.Router()


router.get('/', isAdmin, getUsers);

router.get('/:id', getUser);

router.put('/:id', updateUser);

module.exports = router
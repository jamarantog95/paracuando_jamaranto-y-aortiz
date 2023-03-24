const express = require('express');
const { getStates, getState, updateState } = require('../controllers/state.controller');

const router = express.Router()


router.get('/', getStates);

router.get('/:id', getState);

router.put('/:id', updateState);


module.exports = router
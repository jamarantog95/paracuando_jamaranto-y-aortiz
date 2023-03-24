const express = require('express');
const { getTags, getTag, updateTag } = require('../controllers/tag.controller');

const router = express.Router()


router.get('/', getTags);

router.get('/:id', getTag);

router.put('/:id', updateTag);

module.exports = router
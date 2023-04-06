const express = require('express');
const { getPublicationsTypes, getPublicationType, updatePublicationType } = require('../controllers/publicationtype.controller');

const router = express.Router()


router.get('/', getPublicationsTypes);

router.get('/:id', getPublicationType);

router.put('/:id', updatePublicationType);

module.exports = router
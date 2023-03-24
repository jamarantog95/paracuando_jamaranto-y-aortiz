const express = require('express');
const { getCountries, getCountry, updateCountry } = require('../controllers/country.controller');


const router = express.Router()


router.get('/', getCountries);

router.get('/:id', getCountry);

router.put('/:id', updateCountry);


module.exports = router
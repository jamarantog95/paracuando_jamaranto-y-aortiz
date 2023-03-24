const express = require('express');
const { getCities, getCity, updateCity } = require('../controllers/city.controller');


const router = express.Router()


router.get('/', getCities);

router.get('/:id', getCity);

router.put('/:id', updateCity);


module.exports = router
const express = require('express');
const { getCountries } = require('../controllers/country.controller');

const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Countries
 *     description: Información acerca de Paises
 */


/**
 * @swagger
 * /api/v1/countries:
 *   get:
 *     tags:
 *       - Countries
 *     summary: Devuelve los paises
 *     description: Retorna los paises
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 *     security:  
 *       - bearerAuth: []
 */
router.get('/', getCountries);


module.exports = router

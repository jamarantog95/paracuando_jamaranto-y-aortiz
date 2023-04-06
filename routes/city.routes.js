const express = require('express');
const { getCities } = require('../controllers/city.controller');

const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Cities
 *     description: Información acerca de Ciudades
 */


/**
 * @swagger
 * /api/v1/cities:
 *   get:
 *     tags:
 *       - Cities
 *     summary: Devuelve las ciudades
 *     description: Retorna las ciudades
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 *     security:  
 *       - bearerAuth: []
 */
router.get('/', getCities);


module.exports = router



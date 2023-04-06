const express = require('express');
const { getStates } = require('../controllers/state.controller');

const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: States
 *     description: Información acerca de Estados / Provincias
 */


/**
 * @swagger
 * /api/v1/states:
 *   get:
 *     tags:
 *       - States
 *     summary: Devuelve los estados
 *     description: Retorna los estados/provincias
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 *     security:  
 *       - bearerAuth: []
 */
router.get('/', getStates);


module.exports = router


const express = require('express');
const { getRoles } = require('../controllers/roles.controller');
const passport = require('passport');


const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Roles
 *     description: Información acerca de Roles
 */


/**
 * @swagger
 * /api/v1/roles:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Devuelve los roles
 *     description: Retorna los roles
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 *     security:  
 *       - bearerAuth: []
 */
router.get('/',
    passport.authenticate('jwt', { session: false }),
    getRoles);


module.exports = router

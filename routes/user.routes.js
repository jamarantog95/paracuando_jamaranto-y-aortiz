const express = require('express');
const passport = require('passport');
const { getUsers, getUser, updateUser } = require('../controllers/user.controller');
const { isAdmin } = require('../middlewares/user.middleware');
const router = express.Router()


/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Manejo de Usuarios
 */



router.get('/',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    getUsers);

router.get('/:id', getUser);

router.put('/:id', updateUser);

module.exports = router



/**
 * @swagger
 * components:
 *  schemas:
 *    UserUpdate:
 *      type: object
 *      properties:
 *        first_name:
 *          type: string
 *        last_name:
 *          type: string
 *        code_phone:
 *          type: string
 *        phone:
 *          type: string
 *        interests:
 *          type: string
 *      required:
 *         - first_name
 *         - last_name
 *         - code_phone
 *         - phone
 *         - interests
 *      example:
 *         first_name: Juan
 *         last_name: Amaranto
 *         code_phone: +51
 *         phone: 9483962354
 *         interest: Futbol
 */

const express = require('express');
const passport = require('passport');
const { getUsers, getUser, updateUser } = require('../controllers/user.controller');
const { isAdmin, isAccountOwner } = require('../middlewares/user.middleware');
const router = express.Router()


/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Manejo de Usuarios
 */



/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Filter Users
 *     description: El administrador podrá filtrar usuarios
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 *     security:  
 *       - bearerAuth: []
 */
router.get('/',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    isAccountOwner,
    getUsers);


/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Encuentra un usuario por ID
 *     description: Se verá información pública acerca de un usuario Si el usuario mira su mismo perfil, se le mostrarán campos más completos Campos públicos del usuario (ver condiciones) first_name, last_name, image_url relaciones interest
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string($uuid)
 *            
 *     responses:
 *       200:
 *         description: Successful operation
 *     security:  
 *       - bearerAuth: []
 */
router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    getUser);


/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Altera un usuario por ID
 *     description: El usuario podrá editar sus campos Existen campos que no se deben de tocar a la hora de edición, por ejemplo token,email_verified, password, email, username
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *            type: string($uuid)
 * 
 *     requestBody:
 *       description: Podrá editar los campos que no comprometan a la autenticación
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *         application/x-www-form-urlencoded:
 *           schema: 
 *             $ref: "#/components/schemas/UserUpdate"
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 *     security:  
 *       - bearerAuth: []

 */
router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    updateUser);



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

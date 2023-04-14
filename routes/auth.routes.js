const express = require('express')
const router = express.Router()

const passport = require('../libs/passport')

const verifySchema = require('../schemas/joiSchema.checker')
const { signupSchema, forgetPasswordSchema, restorePasswordSchema } = require('../schemas/auth.schemas')

const { signUp, logIn, forgetPassword, restorePassword, userToken } = require('../controllers/auth.controller')
const { isAdmin } = require('../middlewares/user.middleware')

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Autenticación del Usuario
 */


/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login Usuario
 *     description: Ingrese las credenciales de usuario
 * 
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *         application/x-www-form-urlencoded:
 *           schema: 
 *             $ref: "#/components/schemas/UserLogin"
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.post('/login', logIn)

/**
 * @swagger
 * /api/v1/auth/sign-up:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Sign-Up Usuario
 *     description: Un usuario se registra
 * 
 *     requestBody:
 *       description: 
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignUp'
 *         application/x-www-form-urlencoded:
 *           schema: 
 *             $ref: "#/components/schemas/UserSignUp"
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.post('/sign-up',
   verifySchema(signupSchema, 'body'),
   signUp)

/**
 * @swagger
 * /api/v1/auth/forget-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Reset Password petition
 *     description: El usuario setea un token en la DB para que pueda cambiar su contraseña El token tiene expiracion.
 * 
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserForgetPassword'
 *         application/x-www-form-urlencoded:
 *           schema: 
 *             $ref: "#/components/schemas/UserForgetPassword"
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.post('/forget-password',
   verifySchema(forgetPasswordSchema, 'body'),
   forgetPassword)

/**
 * @swagger
 * /api/v1/auth/change-password/:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Change Password
 *     description: El usuario enviará su contraseña junto con el token proporcionado al email para poder re establecer su contraseña
 * 
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserResetPassword'
 *         application/x-www-form-urlencoded:
 *           schema: 
 *             $ref: "#/components/schemas/UserResetPassword"
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.post('/change-password/:token',
   verifySchema(restorePasswordSchema, 'body'),
   restorePassword)


/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: User Loggued Info
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 *     security:  
 *       - bearerAuth: []
 * 
 */
router.get(
   '/me',
   passport.authenticate('jwt', { session: false }),
   userToken
);

router.get(
   '/testing',
   passport.authenticate('jwt', { session: false }),
   async (request, response, next) => {
      try {
         return response.status(200).json({
            results: {
               user: request.user,
               isAuthenticated: request.isAuthenticated(),
               isUnauthenticated: request.isUnauthenticated(),
               _sessionManager: request._sessionManager,
               authInfo: request.authInfo,
            },
         });
      } catch (error) {
         console.log(error);
         next(error);
      }
   }
);

module.exports = router


/**
 * @swagger
 * components:
 *  schemas:
 *    UserLogin:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: the user email
 *        password:
 *          type: string
 *          description: the user password
 *          format: password
 *      required:
 *         - email
 *         - password
 *      example:
 *         email: jc_amg@email.com
 *         password: 1jc90xD
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    UserSignUp:
 *      type: object
 *      properties:
 *        first_name:
 *          type: string
 *          description: the user first name
 *        last_name:
 *          type: string
 *          description: the user last name
 *        email:
 *          type: string
 *          description: the user email
 *        password:
 *          type: string
 *          description: the user password
 *          format: password
 *      required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *      example:
 *         first_name: Juan Carlos
 *         last_name: Amaranto Gonzalez
 *         email: jc_amg@email.com
 *         password: 1jc90xD
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    UserForgetPassword:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: the user email
 *      required:
 *         - email
 *      example:
 *         email: jc_amg@email.com
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    UserResetPassword:
 *      type: object
 *      properties:
 *        password:
 *          type: string
 *          description: the user password
 *          format: password
 *      required:
 *         - password
 *      example:
 *         password: 12345jcq9
 */
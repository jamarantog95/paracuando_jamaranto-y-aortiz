const express = require('express');
const passport = require('../libs/passport');
const { getPublications, getPublication, createPublication, deletePublication, votes, } = require('../controllers/publications.controller');
const { protectPublication } = require('../middlewares/user.middleware');

const router = express.Router();


/**
 * @swagger
 * tags:
 *   - name: Publications
 *     description: Manejo de Publicaciones
 */



/**
 * @swagger
 * /api/v1/publications:
 *   get:
 *     tags:
 *       - Publications
 *     summary: Devuelve las publicaciones
 *     description: Retorna las publicaciones. Token es opcional, si se envía, devuelve si tiene un same_vote (voto)
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 *     security:  
 *       - bearerAuth: []
 */
router.get('/', getPublications);


/**
 * @swagger
 * /api/v1/publications:
 *   post:
 *     tags:
 *       - Publications
 *     summary: Añade una publicacion
 *     description: Crea una publicacion
 * 
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddPublication'
 *         application/x-www-form-urlencoded:
 *           schema: 
 *             $ref: "#/components/schemas/AddPublication"
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 *     security:  
 *       - bearerAuth: []
 */
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    createPublication
);


/**
 * @swagger
 * /api/v1/publications/{id}:
 *   get:
 *     tags:
 *       - Publications
 *     summary: Encuentra un publication por ID
 *     description: Devuelve información de la publicación. Token es opcional, si se envía, devuelve si tiene un same_vote (voto)
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            
 *     responses:
 *       200:
 *         description: Successful operation
 *     security:  
 *       - bearerAuth: []
 */
router.get('/:id', getPublication);


// router.put('/:id', updatePublication);


/**
 * @swagger
 * /api/v1/publications/{id}:
 *   delete:
 *     tags:
 *       - Publications
 *     summary: Borra una publicacion por ID
 *     description: Borra la publicación, solamente si tiene imágenes asociadas, no se borrará automáticamente
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *            type: integer
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 *     security:  
 *       - bearerAuth: []

 */
router.delete('/:id', protectPublication, deletePublication);


/**
 * @swagger
 * /api/v1/publications/{uuid}/vote':
 *   post:
 *     tags:
 *       - Publications
 *     summary: Vota por una publicacion por ID
 *     description: Vota la publicación, solo basta estar autenticado. Si ya tiene un voto lo borra y si no tiene vota, crea un voto
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 *     security:  
 *       - bearerAuth: []
 */
router.post(
    '/:uuid/vote',
    passport.authenticate('jwt', { session: false }),
    votes
);

module.exports = router;



/**
 * @swagger
 * components:
 *  schemas:
 *    AddPublication:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        content:
 *          type: string
 *        reference_link:
 *          type: string
 *        publication_type_id:
 *          type: string
 *      required:
 *         - title
 *         - description
 *         - content
 *         - reference_link
 *         - publication_type_id
 *      example:
 *         title: Primer Post
 *         description: genero musica
 *         content: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
 *         reference_link: https://www.lipsum.com/
 */
const express = require('express');
const { getTags, getTag, createTag, updateTag, deleteTag } = require('../controllers/tag.controller');

const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Tags
 *     description: Manejo de Categorías
 */



/**
 * @swagger
 * /api/v1/tags:
 *   get:
 *     tags:
 *       - Tags
 *     summary: Devuelve los tags
 *     description: Retorna los tags
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 *     security:  
 *       - bearerAuth: []
 */
router.get('/', getTags);


/**
 * @swagger
 * /api/v1/tags/{id}:
 *   get:
 *     tags:
 *       - Tags
 *     summary: Encuentra un tag
 *     description: Devuelve información del tag
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
router.get('/:id', getTag);


/**
 * @swagger
 * /api/v1/tags:
 *   post:
 *     tags:
 *       - Tags
 *     summary: Añade un tag
 *     description: Crea un tag
 * 
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddTag'
 *         application/x-www-form-urlencoded:
 *           schema: 
 *             $ref: "#/components/schemas/AddTag"
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 *     security:  
 *       - bearerAuth: []
 */
router.post('/', createTag);


/**
 * @swagger
 * /api/v1/tags/{id}:
 *   put:
 *     tags:
 *       - Tags
 *     summary: Altera los campos del tag
 *     description: Editará el tag
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *            type: integer
 * 
 *     requestBody:
 *       description: Update an existent tag
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddTag'
 *         application/x-www-form-urlencoded:
 *           schema: 
 *             $ref: "#/components/schemas/AddTag"
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 *     security:  
 *       - bearerAuth: []

 */
router.put('/:id', updateTag);


/**
 * @swagger
 * /api/v1/tags/{id}:
 *   delete:
 *     tags:
 *       - Tags
 *     summary: Remueve un tag
 *     description: Borra información del tag y sus asociaciones
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
router.delete('/:id', deleteTag);


module.exports = router


/**
 * @swagger
 * components:
 *  schemas:
 *    AddTag:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        description:
 *          type: string
 *      required:
 *         - name
 *         - description
 *      example:
 *         name: Musica
 *         description: genero musica
 */
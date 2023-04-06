const express = require('express');
const { getPublicationsTypes, getPublicationType, updatePublicationType } = require('../controllers/publicationtype.controller');

const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Publications Types
 *     description: Tipos de publicaciones
 */


/**
 * @swagger
 * /api/v1/publications-types:
 *   get:
 *     tags:
 *       - Publications Types
 *     summary: Devuelve las ciudades
 *     description: Retorna las ciudades
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 *     security:  
 *       - bearerAuth: []
 */
router.get('/', getPublicationsTypes);


/**
 * @swagger
 * /api/v1/publications-types/{id}:
 *   get:
 *     tags:
 *       - Publications Types
 *     summary: Encuentra un publication type por ID
 *     description: Retorna los tipos de publicaciones a elegir
 * 
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *        description: Invalid ID supplied
 *       404:
 *        description: Publication Type not found
 *     security:  
 *       - bearerAuth: []
 */
router.get('/:id', getPublicationType);


/**
 * @swagger
 * /api/v1/publications-types/{id}:
 *   put:
 *     tags:
 *       - Publications Types
 *     summary: Altera los campos del publication type
 *     description: Editará el publication type
 * 
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
 *             $ref: '#/components/schemas/PublicationTypeUpdate'
 *         application/x-www-form-urlencoded:
 *           schema: 
 *             $ref: "#/components/schemas/PublicationTypeUpdate"
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 *     security:  
 *       - bearerAuth: []
 */
router.put('/:id', updatePublicationType);



module.exports = router


/**
 * @swagger
 * components:
 *  schemas:
 *    PublicationTypeUpdate:
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
 *         name: Torneos
 *         description: X
 */
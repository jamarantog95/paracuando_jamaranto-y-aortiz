const express = require('express');
const { getCountries, getCountry, updateCountry } = require('../controllers/country.controller');

const router = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    Country:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The Country id
 *        name:
 *          type: string
 *          description: The name of country
 *      required:
 *         - id
 *         - name
 *      example:
 *         id: 1
 *         name: Peru
 */



/**
 * @swagger
 * /api/v1/countries:
 *   get:
 *     tags:
 *       - Country
 *     summary: Get Countries
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Countries Found
 *                 data:
 *                   type: array 
 *                   items:
 *                     type: object 
 *                     $ref: "#/components/schemas/Country"
 */
router.get('/', getCountries);


/**
 * @swagger
 * /api/v1/countries/{id}:
 *   get:
 *     tags:
 *       - Country
 *     summary: Get Country
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Country Found
 *                 data:
 *                   type: array 
 *                   items:
 *                     type: object 
 *                     $ref: "#/components/schemas/Country"
 *       400:
 *        description: Invalid ID supplied
 *       404:
 *        description: Country not found
 */
router.get('/:id', getCountry);


/**
 * @swagger
 * /api/v1/countries/{id}:
 *   put:
 *     tags:
 *       - Country
 *     summary: Update Country
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *            type: integer
 * 
 *     requestBody:
 *       description: Update an existent country
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Country'
 *         application/x-www-form-urlencoded:
 *           schema: 
 *             $ref: "#/components/schemas/Country"
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Country Found
 *                 data:
 *                   type: array 
 *                   items:
 *                     type: object 
 *                     $ref: "#/components/schemas/Country"
 */
router.put('/:id', updateCountry);


module.exports = router
const express = require('express');
const { getStates, getState, updateState } = require('../controllers/state.controller');

const router = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    State:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The State id
 *        country_id:
 *          type: integer
 *          enum: [1,2]
 *          description: >
 *             dictionary:
 *                 * 1 Peru
 *                 * 2 Argentina
 *        name:
 *          type: string
 *          description: The name of state
 *      required:
 *         - id
 *         - country_id
 *         - name
 *      example:
 *         id: 2
 *         name: Lima
 */



/**
 * @swagger
 * /api/v1/states:
 *   get:
 *     tags:
 *       - State
 *     summary: Get States
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
 *                   example: State Found
 *                 data:
 *                   type: array 
 *                   items:
 *                     type: object 
 *                     $ref: "#/components/schemas/State"
 */
router.get('/', getStates);

router.get('/:id', getState);


/**
 * @swagger
 * /api/v1/states/{id}:
 *   put:
 *     tags:
 *       - State
 *     summary: Update State
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *            type: integer
 * 
 *     requestBody:
 *       description: Update an existent state
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/State'
 *         application/x-www-form-urlencoded:
 *           schema: 
 *             $ref: "#/components/schemas/State"
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
 *                   example: State Found
 *                 data:
 *                   type: array 
 *                   items:
 *                     type: object 
 *                     $ref: "#/components/schemas/State"
 */
router.put('/:id', updateState);


module.exports = router
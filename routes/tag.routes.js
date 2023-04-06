const express = require('express');
const {
  getTags,
  getTag,
  updateTag,
  createTag,
} = require('../controllers/tag.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Tag:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The Tag id
 *        name:
 *          type: string
 *          description: The name of tag
 *      required:
 *         - id
 *         - name
 *      example:
 *         id: 4
 *         name: Musica
 */

/**
 * @swagger
 * /api/v1/tags:
 *   get:
 *     tags:
 *       - Tag
 *     summary: Get Tags
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
 *                   example: Tag Found
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     $ref: "#/components/schemas/Tag"
 */
router.get('/', getTags);

router.post('/', createTag);

/**
 * @swagger
 * /api/v1/tags/{id}:
 *   get:
 *     tags:
 *       - Tag
 *     summary: Get Tag
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
 *                   example: Tag Found
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     $ref: "#/components/schemas/Tag"
 *       400:
 *        description: Invalid ID supplied
 *       404:
 *        description: Tag not found
 */
router.get('/:id', getTag);

/**
 * @swagger
 * /api/v1/tags/{id}:
 *   put:
 *     tags:
 *       - Tag
 *     summary: Update Tag
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
 *             $ref: '#/components/schemas/Tag'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/Tag"
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
 *                   example: Tag Found
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     $ref: "#/components/schemas/Tag"
 */
router.put('/:id', updateTag);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *           example: Nintendo Switch
 *         owner:
 *           type: string
 *           description: MongoDB ObjectId of the user who owns the product
 *           example: 60f7c2d2b1a3f8b7a6c4e9b1
 *         price:
 *           type: number
 *           example: 299.99
 *         image:
 *           type: string
 *           example: 162434343434-nintendo.jpg
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["gaming", "console"]
 */

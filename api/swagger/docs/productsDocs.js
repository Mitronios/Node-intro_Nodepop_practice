/**
 * @swagger
 * /products:
 *   get:
 *     summary: List all products
 *     description: Returns a list of products with optional filters like name, price, pagination, sorting, and projection.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *           example: Nintendo
 *         description: Filter products by name (case-insensitive)
 *       - in: query
 *         name: price
 *         schema:
 *           type: string
 *           example: 100-200
 *         description: Filter by price range (e.g., `100-200`) or exact price (e.g., `150`)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 2
 *         description: Maximum number of products to return
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           example: 2
 *         description: Number of products to skip (for pagination)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: -name
 *         description: Field to sort by. Prefix with `-` for descending order (e.g., `-name`)
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *           example: name -_id price
 *         description: Space-separated list of fields to include or exclude (prefix with `-` to exclude)
 *       - in: query
 *         name: count
 *         schema:
 *           type: boolean
 *           example: true
 *         description: If true, includes the total count of products matching the filters
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 count:
 *                   type: integer
 *                   description: Total count (only if `count=true`)
 */

/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Get a single product by ID
 *     description: Retrieve a specific product using its unique identifier.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: A product object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     description: Creates a new product and uploads an image file.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: PlayStation 5
 *               price:
 *                 type: number
 *                 example: 499.99
 *               description:
 *                 type: string
 *                 example: Consola de última generación
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the product
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input data
 */

/**
 * @swagger
 * /products/{productId}:
 *   put:
 *     summary: Update an existing product
 *     description: Updates a product by ID. Accepts updated fields and optionally a new image file.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nintendo Switch OLED
 *               price:
 *                 type: number
 *                 example: 349.99
 *               description:
 *                 type: string
 *                 example: Versión con pantalla OLED
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional image file
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Invalid input data
 */

/**
 * @swagger
 * /products/{productId}:
 *   delete:
 *     summary: Delete a product
 *     description: Deletes a product by ID. If the product has an image, it will also be removed from the server.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully (no content returned)
 *       404:
 *         description: Product not found
 */

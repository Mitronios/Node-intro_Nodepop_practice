/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account and returns the created user object.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Validation error or duplicate email
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in and receive a JWT
 *     description: Authenticate a user with email and password. Returns a JWT token if successful.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: Login successful - JWT returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tokenJWT:
 *                   type: string
 *                   description: JSON Web Token

 *       401:
 *         description: Invalid credentials
 */

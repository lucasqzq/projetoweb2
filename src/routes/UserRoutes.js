const express = require('express'); // Importa o express
const swaggerJsDoc = require('swagger-jsdoc'); // Importa swagger-jsdoc
const swaggerUi = require('swagger-ui-express'); // Importa swagger-ui-express
const UserController = require('../controllers/UserController');

const router = express.Router(); // Cria um roteador

// Configuração do Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'User API',
            version: '1.0.0',
            description: 'API para gerenciar usuários',
        },
        servers: [{ url: 'http://localhost:3000' }],
    },
    apis: ['./routes/UserRoutes.js'], // Caminho para o arquivo das rotas
};

// Gera a documentação Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Usa o Swagger UI para a documentação
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas de Usuários
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna a lista de usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get('/', UserController.getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado
 */
router.post('/', UserController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', UserController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/:id', UserController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuário deletado
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/:id', UserController.deleteUser);

// Exporta o roteador
module.exports = router;
console.log(swaggerDocs);

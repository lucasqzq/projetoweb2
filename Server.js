// Server.js
const reflect_metadata = require('reflect-metadata'); // Grupo 1
const dotenv = require('dotenv'); // Grupo 1
const express = require('express'); // Grupo 1
const cors = require('cors'); // Grupo 1
const userRoutes = require('./src/routes/UserRoutes'); // Grupo 1
const swaggerUi = require('swagger-ui-express'); // Grupo 1
const swaggerSpecs = require('./swaggerConfig'); // Grupo 1
const sequelize = require('./src/database'); // Importando a instância do Sequelize

dotenv.config(); // Grupo 1

const app = express(); // Grupo 1

// Middleware
app.use(cors({ // Grupo 1
    origin: "*",
    credentials: true,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json()); // Grupo 1

// Configurando o Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs)); // Grupo 1

app.use('/users', userRoutes); // Grupo 1

app.get('/', (req, res) => {
    res.send('API está funcionando!'); 
});

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API para gerenciar usuários',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/UserRoutes.js'], // Ajuste o caminho se necessário
};



const port = process.env.PORT || 3000; // Grupo 1

app.listen(port, () => { // Grupo 1
    try {
        console.log(`Server running ON: http://localhost:${port}/`);
    } catch (error) {
        console.error(`ERROR Listen Server: ${error}`);
    }
});

module.exports = { // Grupo 1
    app,
    sequelize, // Exportando a instância do Sequelize
};

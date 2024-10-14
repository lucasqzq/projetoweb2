// Server.ts

import reflect_metadata from 'reflect-metadata';
import dotenv from 'dotenv';
import express, {Request, Response} from 'express';
import cors from 'cors';
import userRoutes from './src/routes/UserRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swaggerConfig';
import sequelize from './src/config/database'; // Importando a instância do Sequelize

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: "*",
    credentials: true,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

// Configurando o Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('/ Carregado'); 
});

// Rota de Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: '/health API está funcionando!' });
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
  apis: ['./src/routes/UserRoutes.ts'], // Ajuste o caminho se necessário
};



const port = process.env.PORT || 3000;

app.listen(port, () => {
    try {
        console.log(`Server running ON: http://localhost:${port}/`);
    } catch (error) {
        console.error(`ERROR Listen Server: ${error}`);
    }
});

export {
    app,
    sequelize, // Exportando a instância do Sequelize
};

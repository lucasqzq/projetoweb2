// database.ts

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Certifique-se de carregar as variáveis de ambiente

const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASSWORD as string, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql', 
});

// Testando a conexão com o banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });

export default sequelize; // Exportando a instância do Sequelize
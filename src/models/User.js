const sequelize = require('../database'); 
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Adicionando unique para evitar emails duplicados
    },
}, {
    timestamps: true, // Para incluir createdAt e updatedAt
    tableName: 'teste', // Opcional: define o nome da tabela explicitamente
});

module.exports = User;

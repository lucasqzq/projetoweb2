// User.ts

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; 

class User extends Model {
    public id!: number // Aqui definimos a propriedade id como número
    public name!: string
    public email!: string
    public password!: string // Defina a propriedade password como string
}

User.init (
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Adicionando unique para evitar emails duplicados
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, 
    {
        sequelize, // Para incluir createdAt e updatedAt, Passando a instância do Sequelize
        modelName: 'teste', // Nome do modelo
    }
);

export default User;

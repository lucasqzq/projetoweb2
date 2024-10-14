// UserService.ts

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../models/User';

const UserService = {

    getAllUsers: async () => {
        try {
            return await User.findAll();
        } catch (error) {
            throw new Error('Erro ao buscar usuários: ' + (error as Error).message);
        }
    },

    getUserById: async (id: string) => {
        try {
            const user = await User.findByPk(id);
            if (!user) throw new Error('Usuário não encontrado');
            return user;
        } catch (error) {
            throw new Error('Erro ao buscar usuário: ' + (error as Error).message);
        }
    },

    createUser: async (data: { name: string; email: string; password: string }) => {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10); // Criptografa a senha
            return await User.create({ ...data, password: hashedPassword }); // Aqui deve estar a função create que cria o usuário com a senha criptografada
        } catch (error) {
            throw new Error('Erro ao criar usuário: ' + (error as Error).message);
        }
    },

    updateUser: async (id: string, data: { name?: string; email?: string }) => {
        try {
            const user = await User.findByPk(id);
            if (!user) throw new Error('Usuário não encontrado');
            return await user.update(data);
        } catch (error) {
            throw new Error('Erro ao atualizar usuário: ' + (error as Error).message);
        }
    },

    deleteUser: async (id: string) => {
        try {
            const user = await User.findByPk(id);
            if (!user) throw new Error('Usuário não encontrado');
            await user.destroy();
            return true;
        } catch (error) {
            throw new Error('Erro ao deletar usuário: ' + (error as Error).message);
        }
    },

    login: async (email: string, password: string) => {
        try {
            const user = await User.findOne({ where: { email } })
            if (!user) throw new Error('Usuário não encontrado')

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) throw new Error('Senha incorreta')

            // Gerar um token
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secreta', { expiresIn: '1h' })

            return { token }
        } catch (error) {
            throw new Error('Erro ao fazer login: ' + (error as Error).message)
        }
    },
};

export default UserService;

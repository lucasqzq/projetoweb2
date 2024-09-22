const User = require('../models/User');

const UserService = {
    getAllUsers: async () => {
        try {
            return await User.findAll();
        } catch (error) {
            throw new Error('Erro ao buscar usuários: ' + error.message);
        }
    },

    getUserById: async (id) => {
        try {
            const user = await User.findByPk(id);
            if (!user) throw new Error('Usuário não encontrado');
            return user;
        } catch (error) {
            throw new Error('Erro ao buscar usuário: ' + error.message);
        }
    },

    createUser: async (data) => {
        try {
            return await User.create(data); // Aqui deve estar a função create
        } catch (error) {
            throw new Error('Erro ao criar usuário: ' + error.message);
        }
    },

    updateUser: async (id, data) => {
        try {
            const user = await User.findByPk(id);
            if (!user) throw new Error('Usuário não encontrado');
            return await user.update(data);
        } catch (error) {
            throw new Error('Erro ao atualizar usuário: ' + error.message);
        }
    },

    deleteUser: async (id) => {
        try {
            const user = await User.findByPk(id);
            if (!user) throw new Error('Usuário não encontrado');
            await user.destroy();
            return true;
        } catch (error) {
            throw new Error('Erro ao deletar usuário: ' + error.message);
        }
    },
};

module.exports = UserService;

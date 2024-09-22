// UserController.js
const UserService = require('../services/UserService'); // Grupo 1

process.on('uncaughtException', (error) => { // Grupo 1
    console.error(`Uncaught Exception: ${error}`);
});

const UserController = { // Grupo 1
    getAllUsers: async (req, res) => {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getUserById: async (req, res) => { // Grupo 1
        try {
            const user = await UserService.getUserById(req.params.id);
            if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createUser: async (req, res) => { // Grupo 1
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateUser: async (req, res) => { // Grupo 1
        try {
            const user = await UserService.updateUser(req.params.id, req.body);
            if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteUser: async (req, res) => { // Grupo 1
        try {
            const result = await UserService.deleteUser(req.params.id);
            if (!result) return res.status(404).json({ message: 'Usuário não encontrado' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = UserController; // Grupo 1

// UserController.ts

import { Request, Response } from 'express';
import UserService from '../services/UserService';

process.on('uncaughtException', (error) => {
    console.error(`Uncaught Exception: ${error}`);
});

const UserController = {
    getAllUsers: async (req: Request, res: Response) => {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    getUserById: async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await UserService.getUserById(req.params.id);
            if (!user) {
                res.status(404).json({ message: 'Usuário não encontrado' });
                return 
            } 
                
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    createUser: async (req: Request, res: Response) => {
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    },

    updateUser: async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await UserService.updateUser(req.params.id, req.body);
            if (!user) {
                res.status(404).json({ message: 'Usuário não encontrado' });
                return 
            } 
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    },

    deleteUser: async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await UserService.deleteUser(req.params.id);
            if (!result) {
                res.status(404).json({ message: 'Usuário não encontrado' });
                return 
            } 
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const result = await UserService.login(email, password)
            res.status(200).json(result)
        } catch (error) {
            res.status(401).json({ message: (error as Error).message })
        }
    },
};

export default UserController;

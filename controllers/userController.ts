import { type Request, type Response, type NextFunction } from "express";
import { User, Contact } from "../models";

// CRUD User
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.findAll({
            include: [{
                model: Contact,
                attributes: ['id', 'name', 'phone_number']
            }]
        });
        console.log('All users:', JSON.stringify(users, null, 2));
        res.status(200).json({ success: true, data: users });
    } catch(error) {
        next(error);
    }
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user});
    } catch(error: any) {
        if (error.name   === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ success: false, error: 'Email already registered' });
        }
        next(error);
    }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(Number(id));

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        await user.destroy();

        res.status(200).json({
            success: true,
            message: `User with ID ${id} has been deleted`
        });

    } catch(error) {
        next(error);
    }
}

const updateUsername = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username || username.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Username cannot be empty'
            });
        }

        const user = await User.findByPk(Number(id));

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        
        const lastUsername = user.getDataValue('username');
        await user.update({ username });

        res.status(200).json({
            success: true,
            message: `User ${lastUsername} has been changed to ${username}`
        });

    } catch(error) {
        next(error);
    }
}

const getUserbyId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(Number(id), {
            include: [{
                model: Contact,
                attributes: ['id', 'name', 'phone_number']
            }]
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
}

export {
    getAllUsers,
    getUserbyId,
    updateUsername,
    deleteUser,
    createUser
}
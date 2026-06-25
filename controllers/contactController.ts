import { Request, Response, NextFunction } from "express";
import { Contact, User } from "../models";

const getAllContacts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await Contact.findAll();
        console.log('All contacts:', JSON.stringify(users, null, 2));
        res.status(200).json({ success: true, data: users });
    } catch(error) {
        next(error);
    }
} 

const getContactUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        const contacts = await Contact.findAll({
            where: {
                user_id: userId
            }
        });

        res.status(200).json({ 
            success: true, 
            data: contacts
        });
    } catch(error) {
        next(error);
    }
}

const createContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const { name, phone_number } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        const newContact = await Contact.create({
            user_id: userId,
            name: name,
            phone_number: phone_number
        })

        res.status(201).json({ 
            success: true, 
            message: `Successfully add new contact to user ${user.getDataValue('username')}`,
            data: newContact
        });
    } catch(error) {
        next(error);
    }
}

const getContactbyId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByPk(id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                error: 'Contact not found'
            });
        }

        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (error) {
        next(error);
    }
}

const updateContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { name, phone_number } = req.body;
        const contact = await Contact.findByPk(id);

        if (!contact) {
            return res.status(404).json({ 
                success: false, 
                message: 'Contact not found' });
        }

        if (name) contact.name = name;
        if (phone_number) contact.phone_number = phone_number;

        await contact.save();

        res.status(200).json({ 
            success: true, 
            message: 'Contact information has been successfully updated', 
            data: contact 
        });
    } catch (error) {
        next(error);
    }
};

const deleteContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByPk(id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                error: 'Contact not found'
            });
        }

        await contact.destroy();

        res.status(200).json({
            success: true,
            message: `Contact with ID ${id} has been deleted`
        });

    } catch(error) {
        next(error);
    }
}

export {
    getAllContacts,
    getContactUser,
    createContact,
    getContactbyId,
    updateContact,
    deleteContact
}
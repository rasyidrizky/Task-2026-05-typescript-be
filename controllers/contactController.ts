import { type Request, type Response, type NextFunction } from "express";
import { Contact, User } from "../models";

const createContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const { name, phone_number } = req.body;

        const user = await User.findByPk(Number(userId));
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

const updateContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { name, phone_number } = req.body;
        const contact = await Contact.findByPk(Number(id));

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
        const contact = await Contact.findByPk(Number(id));

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
    createContact,
    updateContact,
    deleteContact
}
import { Request, Response, NextFunction } from "express";

function validateUser (req: Request, res: Response, next: NextFunction) {
    const { username, email } = req.body;
    const errors = [];

    if (!username) {
        errors.push('Username cannot be empty');
    } else if (typeof username !== 'string') {
        errors.push('Username must be text');
    } else if (username.trim().length < 3) {
        errors.push('Username must be 3 characters or more');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        errors.push('Email cannot be empty');
    } else if (typeof email !== 'string') {
        errors.push('Email must be text');
    } else if (!emailRegex.test(email.trim())) {
        errors.push('Invalid email format');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }

    next();
}

function validateUpdate (req: Request, res: Response, next: NextFunction) {
    const { username } = req.body;
    const errors = [];

    if (!username) {
        errors.push('Username cannot be empty');
    } else if (typeof username !== 'string') {
        errors.push('Username must be text');
    } else if (username.trim().length < 3) {
        errors.push('Username must be 3 characters or more');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }

    next();
}

function validateContact (req: Request, res: Response, next: NextFunction) {
    const { name, phone_number } = req.body;
    const errors = [];

    if (!name) {
        errors.push('Contact name cannot be empty');
    } else if (typeof name !== 'string') {
        errors.push('Contact name must be text');
    } else if (name.trim().length < 3) {
        errors.push('Contact name must be 3 characters or more');
    }

    const phoneRegex = /^[0-9]+$/;

    if (!phone_number) {
        errors.push('Phone number cannot be empty');
    } else if (typeof phone_number !== 'string') {
        errors.push('Phone number must be text');
    } else if (!phoneRegex.test(phone_number.trim())) {
        errors.push('Invalid phone number format');
    } else if (phone_number.trim().length < 10) {
        errors.push('Phone number must be 10 characters or more');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }

    next();
}

export {
    validateUser,
    validateUpdate,
    validateContact
}
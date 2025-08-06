import { verify }  from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { UserJwtPayload } from "../interfaces/express"; // Import your custom type
import { AppError } from "../utils/errorHandler";


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        throw new AppError('Authentication required', 401);
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET!) as UserJwtPayload;
        req.user = decoded; // Now properly typed
        next();
    } catch (error) {
        throw new AppError('Invalid token', 401);
    }
};
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errorHandler';

export const authenticate = (req: Request, res: Response, next: NextFunction): void =>
{
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token)
        throw new AppError('Authentication required', 401);

    try
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret')
        req.user = decoded as jwt.JwtPayload;
        next();
    }
    catch(error)
    {
        throw new AppError('Invalid token', 401);
    }
};
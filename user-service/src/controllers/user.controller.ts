import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { IUserCredential } from '../interfaces/user.interface';
import { AppError } from '../utils/errorHandler';

export class UserController 
{
  private userService: UserService;

  constructor() 
  {
    this.userService = new UserService;
  }

  async register(req: Request, res: Response): Promise<void> 
  {
    try
    {
      const userData: IUserCredential = req.body;
      const newUser = await this.userService.register(userData);
      res.status(201).json({ message: 'User created succressfully', user: newUser });
    }
    catch(error)
    {
      if (error instanceof AppError)
        res.status(error.statusCode).json({ message: error.message });
      else
        res.status(500).json({ message: 'Internal server error' });
    }
  }

  async login(req: Request, res: Response): Promise<void>
  {
    try
    {
      const loginData: IUserCredential = req.body;
      const { token, user } = await this.userService.login(loginData);
      res.status(200).json({ message: "Login successful", token ,user });
    }
    catch(error)
    {
      if (error instanceof AppError)
        res.status(error.statusCode).json({ message: error.message });
      else
        res.status(500).json({ message: "Internal server error" });
    }
  }
}
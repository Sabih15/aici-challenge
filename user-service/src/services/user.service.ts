import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser, IUserCredential } from '../interfaces/user.interface';
import { UserRepository } from '../repository/user.repository';
import { AppError } from '../utils/errorHandler';

export class UserService
{
    private userRepository: UserRepository;
    private jwtSecret: string;

    constructor()
    {
        this.userRepository = new UserRepository();
        this.jwtSecret = process.env.JTW_SECRET || 'default_secret';
    }

    async register(userData: IUserCredential): Promise<IUser>
    {
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser)
            throw new AppError("Email already in use", 409)

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return this.userRepository.create
        ({
            email: userData.email,
            password: hashedPassword
        });
    }

    async login(loginData: IUserCredential): Promise<{token: string, user: Omit<IUser, 'password'> }>
    {
        const user = await this.userRepository.findByEmail(loginData.email);
        if (!user)
            throw new AppError('Invalid email', 401);

        const passwordMatch = await bcrypt.compare(loginData.password, user.password);
        if (!passwordMatch)
            throw new AppError('Invalid password', 401);

        const token = 
        jwt.sign({user_uuid: user.uuid, email: user.email},
        this.jwtSecret, { expiresIn: '1h' });

        const { password, ...userWithoutPassword } = user;
        return {token, user: userWithoutPassword };
    }
}
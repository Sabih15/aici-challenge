import { UserService } from '../services/user.service';
import { UserRepository } from '../repository/user.repository';
import { AppError } from '../utils/errorHandler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../repository/user.repository');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('UserService', () => {
    let userService: UserService;
    let mockUserRepository: jest.Mocked<UserRepository>;

    beforeEach(() => {
        mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
        userService = new UserService();
        (userService as any).userRepository = mockUserRepository;
        process.env.JWT_SECRET = 'test_secret';
    });

    describe('register', () => {
        it('should register a new user', async () => {
            const userData = { email: 'test@example.com', password: 'password123' };
            const hashedPassword = 'hashedPassword';

            mockUserRepository.findByEmail.mockResolvedValue(null);
            (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
            mockUserRepository.create.mockResolvedValue({
                id: 1,
                uuid: 'uuid',
                email: userData.email,
                password: hashedPassword
            });

            const result = await userService.register(userData);

            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(userData.email);
            expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
            expect(mockUserRepository.create).toHaveBeenCalledWith({
                ...userData,
                password: hashedPassword
            });
            expect(result.email).toBe(userData.email);
        });

        it('should throw error if email already exists', async () => {
            const userData = { email: "test@example.com", password: 'password123' };
            mockUserRepository.findByEmail.mockResolvedValue({
                id: 1,
                uuid: 'uuid',
                email: userData.email,
                password: 'hashedPassword'
            });

            await expect(userService.register(userData)).rejects.toThrow(AppError);
        });

        it('should throw error if password is too short', async () => {
            const userData = { email: "test@example.com", password: "12345" };
            await expect(userService.register(userData)).rejects.toThrow(AppError);
        });
    });

    describe("login", () => {
        it('should login with valid credentials', async () => {
            const loginData = { email: 'test@example.com', password: 'password123' };
            const mockUser = {
                id: 1,
                uuid: 'uuid',
                email: loginData.email,
                password: 'hashedPassword'
            };

            mockUserRepository.findByEmail.mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (jwt.sign as jest.Mock).mockReturnValue('mockToken');

            const result = await userService.login(loginData);
            
            expect(result.token).toBe('mockToken');
            expect(result.user.email).toBe(loginData.email);
            expect(result.user).not.toHaveProperty('password');
        });

        it('should throw error with invalid credentials', async () => {
            const loginData = { email: 'test@example.com', password: 'password123' };
            mockUserRepository.findByEmail.mockResolvedValue(null);
            await expect(userService.login(loginData)).rejects.toThrow(AppError);
        });
    });
});
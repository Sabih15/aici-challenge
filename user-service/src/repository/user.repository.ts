import { PrismaClient } from "@prisma/client";
import { IUser, IUserCredential } from "../interfaces/user.interface";

const prisma = new PrismaClient();

export class UserRepository 
{
    async create(userData: IUserCredential): Promise<IUser> 
    {
        return await prisma.user.create
        ({
            data: userData,
        });
    }

    async findByEmail(email: string): Promise<IUser | null>
    {
        return await prisma.user.findUnique
        ({
            where: { email },
        });
    }

    async findById(id: number): Promise<IUser | null>
    {
        return await prisma.user.findUnique
        ({
            where: { id },
        });
    }
}
import { PrismaClient } from "@prisma/client";
import { ITodo, ITodoCreate, ITodoUpdate } from '../interfaces/todo.interface';

const prisma = new PrismaClient()

export class TodoRepository
{
    async create(todoData:ITodoCreate): Promise<ITodo>
    {
        return await prisma.todo.create
        ({
            data: todoData
        });
    }

    async update(uuid: string, data: ITodoUpdate): Promise<ITodo>
    {
        return await prisma.todo.update
        ({
            where: { uuid },
            data
        });
    }

    async findByUuid(uuid: string): Promise<ITodo | null>
    {
        return await prisma.todo.findUnique
        ({
            where: { uuid }
        });
    }

    async findAllByUser(user_uuid: string): Promise<ITodo[]>
    {
        return await prisma.todo.findMany
        ({
            where: { user_uuid }
        });
    }

    async delete(uuid: string): Promise<void>
    {
        await prisma.todo.delete
        ({
            where: { uuid }
        });
    }
}
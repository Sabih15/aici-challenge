import { ITodo, ITodoCreate, ITodoUpdate } from '../interfaces/todo.interface'
import { TodoRepository } from '../repository/todo.repository'
import { AppError } from '../utils/errorHandler'

export class TodoService
{
    private todoRepository: TodoRepository

    constructor(todoRepository?: TodoRepository)
    {
        this.todoRepository = todoRepository || new TodoRepository()
    }

    async createTodo(todoData: ITodoCreate): Promise<ITodo>
    {
        return this.todoRepository.create(todoData);
    }

    async getTodos(user_uuid: string): Promise<ITodo[]> 
    {
        return this.todoRepository.findAllByUser(user_uuid)
    }
    
    async updateTodo(user_uuid: string, data: ITodoUpdate): Promise<ITodo> 
    {
        return this.todoRepository.update(user_uuid, data)
    }

    async deleteTodo(user_uuid: string): Promise<void> 
    {
        await this.todoRepository.delete(user_uuid)
    }
}
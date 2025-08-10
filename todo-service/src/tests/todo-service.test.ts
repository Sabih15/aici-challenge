import { TodoService } from '../services/todo.service';
import { TodoRepository } from '../repository/todo.repository';
import { ITodo, ITodoCreate, ITodoUpdate } from '../interfaces/todo.interface';

jest.mock('../repository/todo.repository');

describe('TodoService', () => {
    let todoService: TodoService;
    let mockTodoRepository: jest.Mocked<TodoRepository>;

    beforeEach(() => {
        mockTodoRepository = new TodoRepository() as jest.Mocked<TodoRepository>;
        todoService = new TodoService();
        (todoService as any).todoRepository = mockTodoRepository;
    });

    describe('createTodo', () => {
        it('should create a new todo', async () => {
            const todoData: ITodoCreate = { user_uuid: 'uuid', content: 'Test Todo' };
            const createdTodo: ITodo = { id: 1, uuid: 'todo-uuid', ...todoData };

            mockTodoRepository.create.mockResolvedValue(createdTodo);

            const result = await todoService.createTodo(todoData);

            expect(mockTodoRepository.create).toHaveBeenCalledWith(todoData);
            expect(result).toEqual(createdTodo);
        });
    });

    describe('getTodos', () => {
        it('should return all todos for a user', async () => {
            const user_uuid = 'uuid';
            const todos: ITodo[] = [
                { id: 1, uuid: 'todo-uuid-1', user_uuid, content: 'Todo 1' },
                { id: 2, uuid: 'todo-uuid-2', user_uuid, content: 'Todo 2' }
            ];

            mockTodoRepository.findAllByUser.mockResolvedValue(todos);

            const result = await todoService.getTodos(user_uuid);

            expect(mockTodoRepository.findAllByUser).toHaveBeenCalledWith(user_uuid);
            expect(result).toEqual(todos);
        });
    });

    describe('updateTodo', () => {
        it('should update a todo', async () => {
            const user_uuid = 'user_uuid';
            const updateData: ITodoUpdate = { content: 'Updated title' };
            const updatedTodo: ITodo = { id: 1, uuid:'uuid', content: updateData.content ? updateData.content : '', user_uuid };

            mockTodoRepository.update.mockResolvedValue(updatedTodo);

            const result = await todoService.updateTodo(user_uuid, updateData);

            expect(mockTodoRepository.update).toHaveBeenCalledWith(user_uuid, updateData);
            expect(result).toEqual(updatedTodo);
        });
    });

    describe('deleteTodo', () => {
        it('should delete a todo', async () => {
            const user_uuid = 'uuid';
            mockTodoRepository.delete.mockResolvedValue();

            await todoService.deleteTodo(user_uuid);

            expect(mockTodoRepository.delete).toHaveBeenCalledWith(user_uuid);
        });
    });
});

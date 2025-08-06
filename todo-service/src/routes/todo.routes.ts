import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';
import { authenticate } from '../middlewares/auth.middleware'

const router = Router();
const todoController = new TodoController;

router.use(authenticate);

router.post('/todos', todoController.createTodo.bind(todoController))
router.get('/todos', todoController.getTodos.bind(todoController))
router.put('/todos/:uuid', todoController.updateTodo.bind(todoController))
router.delete('/todos/:uuid', todoController.deleteTodo.bind(todoController))

export default router;
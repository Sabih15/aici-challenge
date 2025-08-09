import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';
import { authenticate } from '../middlewares/auth.middleware'

const router = Router();
const todoController = new TodoController;

router.use(authenticate);

router.post('/', todoController.createTodo.bind(todoController))
router.get('/', todoController.getTodos.bind(todoController))
router.put('/:uuid', todoController.updateTodo.bind(todoController))
router.delete('/:uuid', todoController.deleteTodo.bind(todoController))

export default router;
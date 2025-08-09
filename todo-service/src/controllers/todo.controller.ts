import { Request, Response } from 'express'
import { TodoService } from '../services/todo.service'
import { AppError } from '../utils/errorHandler'

export class TodoController {
  private todoService: TodoService

  constructor() {
    this.todoService = new TodoService()
  }

  async createTodo(req: Request, res: Response) {
    try {
      const { content } = req.body
      const user_uuid = req.user?.user_uuid as string
      
      const todo = await this.todoService.createTodo({ content, user_uuid })
      res.status(201).json(todo)
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'Internal server error' })
      }
    }
  }

  async getTodos(req: Request, res: Response) {
    try {
      const user_uuid = req.user?.user_uuid as string
      const todos = await this.todoService.getTodos(user_uuid)
      res.status(200).json(todos)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async updateTodo(req: Request, res: Response) {
    try {
      const uuid = req.params.uuid as string
      const { content } = req.body

      const updatedTodo = await this.todoService.updateTodo(uuid, { content })
      res.status(200).json(updatedTodo)
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'Internal server error' })
      }
    }
  }

  async deleteTodo(req: Request, res: Response) {
    try {
      const uuid = req.params.uuid as string

      await this.todoService.deleteTodo(uuid)
      res.status(204).send()
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'Internal server error' })
      }
    }
  }
}
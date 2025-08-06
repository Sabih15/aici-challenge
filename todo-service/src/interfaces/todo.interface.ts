export interface ITodo {
  id?: number
  uuid: string
  content: string
  user_uuid: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ITodoCreate {
  content: string
  user_uuid: string
}

export interface ITodoUpdate {
  content?: string
}
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private api = axios.create({
    baseURL: 'http://localhost:3001/api/todos'
  });

  constructor() {
    this.api.interceptors.request.use(config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  getTodos(): Observable<any> {
    return from(this.api.get('/').then(res => res));
  }

  createTodo(content: string): Observable<any> {
    return from(this.api.post('/', { content }).then(res => res));
  }

  updateTodo(uuid: string, content: string): Observable<any> {
    return from(this.api.put(`/${uuid}`, { content }).then(res => res));
  }

  deleteTodo(uuid: string): Observable<any> {
    return from(this.api.delete(`/${uuid}`).then(() => uuid));
  }
}
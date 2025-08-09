import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private api = axios.create({
    baseURL: 'http://localhost:3000/api/users'
  });

  login(email: string, password: string): Observable<any> {
    return from(this.api.post('/login', { email, password }).then(res => res));
  }

  register(email: string, password: string): Observable<any> {
    return from(this.api.post('/register', { email, password }).then(res => res));
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  selector: 'app-root',
  template: `
    <div>
      <h1>Todo App</h1>
      <nav>
        <a routerLink="/login">Login</a> | 
        <a routerLink="/register">Register</a> | 
        <a routerLink="/todos">Todos</a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    div { max-width: 800px; margin: 0 auto; padding: 20px; }
    nav { margin: 20px 0; }
    a { margin: 0 10px; }
  `]
})

export class AppComponent {
  constructor(private router: Router) {
    const token = localStorage.getItem('token');

    if (token && !['/login', '/register'].includes(router.url))
      router.navigate(['/todos']);
  }
}

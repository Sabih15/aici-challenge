import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    try {
      if (this.loginForm?.invalid) return;

      this.loading = true;

      this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
        next: res => {
          console.log('login successful', res);
          localStorage.setItem('token', res.data.token);
          this.router.navigate(['/todos'])
        },
        error: err => {
          console.error(err);
          alert(err.response.data.message)
        },
        complete: () => {
          this.loading = false
        }
      })
    }
    catch (err) {
      console.log(err)
      alert(err);
    }
    finally {
      this.loading = false;
    }
  }
}
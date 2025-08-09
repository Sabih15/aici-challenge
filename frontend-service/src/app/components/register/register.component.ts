import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  signUpForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) 
  {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  async onSubmit() {
    try
    {
      if (this.signUpForm?.invalid) return;

      this.loading = true;
      
      this.authService.register(this.signUpForm.value.username, this. signUpForm.value.password).subscribe({
        next: res => {
          console.log('register successful', res);
          alert(res.data.message);
          this.router.navigate(['/login']);
        },
        error: err => {
          console.log(err);
          alert(err.response.data.message);
        },
        complete:() => {
          this.loading = false;
        },
      })
    }
    catch(err)
    {
      console.log(err);
      alert(err);
    }
    finally
    {
      this.loading = false;
    }
  }
}
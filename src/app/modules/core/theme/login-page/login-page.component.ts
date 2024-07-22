import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ ReactiveFormsModule,CommonModule,PasswordModule,IconFieldModule,InputIconModule,InputTextModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit{

  loginForm!: FormGroup;
  isPasswordVisible: boolean = false;

  _fb = inject(FormBuilder)
  _authService = inject(AuthService)
  _toastr = inject(ToastrService)

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login(event:Event) {
    event.preventDefault()
    if (!this.loginForm.valid) {
      this._toastr.error("Username or password incorrect");
      return;
    }
    this._authService.login(this.loginForm.value);
    this._toastr.success("You have successfully logged in");
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}

import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  isUserLoggedIn!: boolean;
  isLoading: boolean = false;
  apiRes!: string;
  login!: Subscription;
  loggedSub!: Subscription;
  navigation!: any;
  userInfo!:any
  loginForm: FormGroup = this._FormBuilder.group({
    email: [null,[Validators.required, Validators.email]],
    password:[null ,[Validators.required, Validators.pattern(/^\w{6,}$/)]]
  })
  constructor(private _FormBuilder: FormBuilder,
    private _AuthenticationService: AuthenticationService,
    private _Router: Router) { 
    }
  ngOnInit(): void {
    this.loggedSub =  this._AuthenticationService.loggedUser.subscribe({
      next: (status) => {
        this.isUserLoggedIn = status
      }
    });
  }
  loginUser() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.login = this._AuthenticationService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.apiRes = res.message;
          this.isLoading = false;
          this._AuthenticationService.loggedUser.next(true);
          localStorage.setItem('token', res.token);
          // decode the token 
          this._AuthenticationService.getDecodedToken()
          this.navigation = setTimeout(() => {
            this._Router.navigate(['/main/home']);
          }, 2000);
        },
        error: (err) => {
          this._AuthenticationService.loggedUser.next(false)
          console.log(err);
          this.apiRes = err.error.message;
          this.isLoading = false
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  ngOnDestroy(): void {
    this.login?.unsubscribe();
    this.loggedSub?.unsubscribe()
    clearTimeout(this.navigation);
  }
}

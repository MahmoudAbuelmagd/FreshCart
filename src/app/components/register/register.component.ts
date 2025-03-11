import { NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {
  constructor(private _AuthenticationService:AuthenticationService,private _Router:Router ) {}
  isLoading: boolean = false;
  apiResponse!: string;
  register!: Subscription;
  intervalId!: any;
  registerForm: FormGroup = new FormGroup({
    name:new FormControl(null,[Validators.required, Validators.minLength(3),Validators.maxLength(10)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword:new FormControl(null),
    phone:new FormControl(null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, this.confirmPassword)
  
  confirmPassword(g:AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null
    } else {
      return {missMatch: true}
    }
  }
  submitForm(): void{
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.register =  this._AuthenticationService.postUser(this.registerForm.value).subscribe({
        next: (res) => {
          this.apiResponse = res.message;
          this.isLoading = false;
          this.intervalId = setInterval(() => {
            this._Router.navigate(['/auth/login'])
            
          },2500)
        },
        error: (error) => {
          this.apiResponse = error.error.message
          this.isLoading = false
        }
      })} else {
      this.registerForm.setErrors({'missMatch':true})
      this.registerForm.markAllAsTouched()
    }
  }
  ngOnDestroy(): void {
    this.register?.unsubscribe()
    clearInterval(this.intervalId)
  }
}

import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Subscription} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpass',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpass.component.html',
  styleUrl: './forgotpass.component.css'
})
export class ForgotpassComponent implements OnDestroy {
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthenticationService = inject(AuthenticationService)
  private readonly _Router = inject(Router)
  currentStep: number = 1;
  showStatus!: string | null;
  clearTime!: NodeJS.Timeout;
  verifyEmailSub!: Subscription;
  verifyCodeSub!: Subscription;
  resetPassSub!: Subscription;
  verifyEmailForm: FormGroup = this._FormBuilder.group({
    email:[null, [Validators.required, Validators.email]]
  })
  
  verifyCodeForm: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.pattern(/^\w{6}$/)]]
  })
  
  resetPasswordForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword:[null ,Validators.pattern(/^\w{6,}$/)]
  })
  
  verifyEmail(): void{
    this.verifyEmailSub = this._AuthenticationService.verfiyEmailApi(this.verifyEmailForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.showStatus = res.message;
        if (res.statusMsg == 'success') {
        this.clearTime = setTimeout(() => {
            this.currentStep = 2;
          },3000)
        }
      }
    })
  }
  verifyCode(): void{
    this.verifyCodeSub = this._AuthenticationService.verfiyCodeApi(this.verifyCodeForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.showStatus = res.message;
        this.clearTime = setTimeout(() => {
          this.currentStep = 3;
          this.resetPasswordForm.patchValue({
            email: this.verifyEmailForm.get('email')?.value
          })
        },3000)
      }
    })
  }
  resetPass(): void{
    this.resetPassSub = this._AuthenticationService.resetPassword(this.resetPasswordForm.value).subscribe({
      next: (res) =>{
        console.log(res);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('token' , res.token)
        }
        this.clearTime = setTimeout(() => {
          this._Router.navigate(["/login"])
        }, 2500)
      }
    })
  }
  ngOnDestroy(): void {
    this.verifyEmailSub.unsubscribe();
    this.verifyCodeSub.unsubscribe();
    this.resetPassSub.unsubscribe();
    clearTimeout(this.clearTime);
  }
}

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  const _toastr = inject(ToastrService)
  return next(req).pipe(catchError((err) => {
    console.log(err);
    if (err.error.message == 'You are not logged in. Please login to get access' ) {
      return throwError(()=>err);
    } else {
      _toastr.error(err.error.message, '', {timeOut: 2500, positionClass: 'toast-bottom-right'})
    }
    return throwError(()=>err)
  }))
};

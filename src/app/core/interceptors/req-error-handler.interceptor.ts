import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const reqErrorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const  _ToastrService=inject(ToastrService)
  return next(req).pipe(
    catchError((err) => {
      console.log(err);
      _ToastrService.error(err.error.message, '',{ positionClass: 'toast-bottom-right'})
      return throwError(()=> err)
    })
  );
};

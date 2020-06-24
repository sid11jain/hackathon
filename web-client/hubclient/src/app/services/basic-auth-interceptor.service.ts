import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class BasicAuthHttpInterceptorService implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                }
            });
        }
        if (req.headers.has('Content-Type')) {
            req = req.clone({
                setHeaders: {
                    'content-type': 'application/json'
                }
            });
        }
        req = req.clone({
            headers: req.headers.set('Accept', 'application/json')
        });
        // req = req.clone({
        //     headers: req.headers.set('Access-Control-Allow-Origin', '*')
        // });

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log(error);
                if (error.status === 401) {
                    this.router.navigate(['login']);
                }
                if (error.status === 400) {
                    alert(error.error);
                }
                return throwError(error);
            })
        );
    }
}

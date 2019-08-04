import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { defer, Observable, of } from 'rxjs';

import { AuthActionTypes, Login, Logout } from './auth.actions';

@Injectable()
export class AuthEffects {

    @Effect({ dispatch: false })
    login$ = this.actions$.pipe(
        ofType<Login>(AuthActionTypes.LoginAction),
        tap(action => localStorage.setItem('user', JSON.stringify(action.payload.user)))
    );

    @Effect({ dispatch: false })
    logout$ = this.actions$.pipe(
        ofType<Logout>(AuthActionTypes.LogoutAction),
        tap(() => {
            localStorage.removeItem('user');
            this.router.navigateByUrl('/login');
        })
    );

    @Effect()
    init$ = defer((): Observable<Login | Logout> => {
        const userData = localStorage.getItem('user');
        if (userData) {
            return of(new Login({ user: JSON.parse(userData) }));
        } else {
            of(new Logout());
        }
    });

    constructor(private actions$: Actions, private router: Router) {

    }

}

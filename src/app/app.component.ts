import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Logout } from './auth/auth.actions';
import { AppState } from './reducers';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(private store: Store<AppState>) {

    }

    ngOnInit() {
        this.isLoggedIn$ = this.store
            .pipe(
                select(isLoggedIn)
            );

        this.isLoggedOut$ = this.store
            .pipe(
                select(isLoggedOut)
            );
    }

    logout() {
        this.store.dispatch(new Logout());
    }

}

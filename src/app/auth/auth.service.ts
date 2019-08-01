import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { User } from '../model/user.model';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {

    }

    login(email: string, password: string): Observable<User> {
        // return this.http.post<User>('/api/login', {email,password});
        const user: User = {
            id: '1',
            email: 'test@angular-university.io'
        };
        return of(user).pipe(delay(50));
    }

}

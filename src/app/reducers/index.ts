import { Action, ActionReducerMap } from '@ngrx/store';

import { User } from '../model/user.model';

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {

};


export enum AuthActionTypes {
    LoginAction = '[Login] Action',
    LogoutAction = '[Logout] Action',
}


export class Login implements Action {

    readonly type = AuthActionTypes.LoginAction;

    constructor(public payload: { user: User }) {

    }
}

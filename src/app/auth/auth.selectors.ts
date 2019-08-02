import { createSelector } from '@ngrx/store';

export const seelctAuthState = state => state.auth;

export const isLoggedIn = createSelector(
    seelctAuthState,
    auth => auth.loggedIn
);

export const isLoggedOut = createSelector(
   isLoggedIn,
   loggedIn => !loggedIn
);

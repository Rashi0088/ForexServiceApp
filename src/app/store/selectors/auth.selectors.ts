import { createSelector } from '@ngrx/store';

export interface AppState {
    auth: AuthState;
}
export interface AuthState {
    user: any; // replace 'any' with the appropriate type for your user data
    error: any; // replace 'any' with the appropriate type for your error data
}


export const selectAuthState = (state: AppState) => state.auth;

export const selectUser = createSelector(
    selectAuthState,
    (state) => state.user
);
export const selectIsLoggedIn = createSelector(
    selectAuthState,
    (authState: AuthState) => !!authState.user
);
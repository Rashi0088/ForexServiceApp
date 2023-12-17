// src/app/store/actions/auth.actions.ts

import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
    '[Auth API] Login Success',
    props<{ response: any }>() // Replace 'any' with your actual response type
);

export const loginFailure = createAction(
    '[Auth API] Login Failure',
    props<{ error: any }>() // Replace 'any' with the type of your error
);
export const logout = createAction('[Auth API] Logout');
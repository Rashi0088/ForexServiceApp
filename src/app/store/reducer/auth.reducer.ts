// src/app/store/reducers/auth.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.action';

export const initialState = {
    user: null,
    error: null
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.loginSuccess, (state, { response }) => ({ ...state, user: response })),
    on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error }))
);

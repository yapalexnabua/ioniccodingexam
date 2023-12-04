import { createReducer, on } from "@ngrx/store";
import { login, loginFailure, loginSuccess, register } from "./auth.actions";
import { AuthState } from "src/app/interfaces/AuthState";
import { Status } from "src/app/interfaces/Status";

export const initialState: AuthState = {
    user: null,
    error: null,
    status: Status.Pending
}

export const authReducer = createReducer(
    initialState,
    on(register, (state, { email, password, role }) => ({
        ...state,
        user: {
            id: Date.now().toString(),
            email,
            password,
            role
        }
    })),
    on(login, (state) => ({
        ...state,
        error: null,
        status: Status.Pending
    })),
    on(loginSuccess, (state, { user }) => ({
        ...state,
        error: null,
        status: Status.Succcess,
        user
    })),
    on(loginFailure, (state, { error }) => ({
        ...state,
        error,
        user: null,
        status: Status.Error
    })),
);

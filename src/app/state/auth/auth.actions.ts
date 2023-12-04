import { createAction, props } from "@ngrx/store";
import { Role } from "src/app/interfaces/Role";
import { User } from "src/app/interfaces/User";

export const register = createAction(
    '[Register Page] Register',
    props<{email: string; password: string; role: Role}>()
);

export const login = createAction(
    '[Login Page] User Login',
    props<{ email: string, password: string }>()
);
  
export const loginSuccess = createAction(
    '[Login Page] Login Success',
    props<{ user: User }>()
);

export const loginFailure = createAction(
    '[Login Page] Login Failure',
    props<{ error: string }>()
);

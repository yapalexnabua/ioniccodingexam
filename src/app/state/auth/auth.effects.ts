import { Injectable } from "@angular/core";
import { Actions, ofType } from '@ngrx/effects';
import { Router } from "@angular/router";
import { catchError, from, map, of, switchMap, tap } from "rxjs";
import { login, loginFailure, loginSuccess, register } from "./auth.actions";
import { AuthService } from "src/app/services/auth/auth.service";
import { User } from "src/app/interfaces/User";

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private authService: AuthService
    ) {}

    register$ = this.actions$.pipe(
        ofType(register),
        tap(() => this.router.navigate(['/']))
    );

    login$ = this.actions$.pipe(
        ofType(login),
        switchMap(async ({ email, password }) => {
            from(this.authService.login({ email, password }))
                .pipe(
                    map((user: User) => loginSuccess({ user })),
                    catchError((error: string) => of(loginFailure({ error })))
                )
        })
    );
}

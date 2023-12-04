import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/interfaces/AppState";
import { AuthState } from "src/app/interfaces/AuthState";

export const selectAuth = (state: AppState) => state.auth;
export const selectUser = createSelector(
    selectAuth,
    (state: AuthState) => state.user
);
  
export const selectError = createSelector(
    selectAuth,
    (state) => state.error
);
  
export const selectStatus = createSelector(
    selectAuth,
    (state) => state.status
);

import { AuthState } from "./AuthState";
import { HorseState } from "./HorseState";

export interface AppState {
    horses: HorseState;
    auth: AuthState;
}
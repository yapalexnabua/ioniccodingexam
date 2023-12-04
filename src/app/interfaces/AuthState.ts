import { Status } from "./Status";
import { User } from "./User";

export interface AuthState {
    user: User | null;
    error: string | null;
    status: Status;
}
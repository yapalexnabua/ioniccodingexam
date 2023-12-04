import { Role } from "./Role";

export interface User {
    id: string;
    email: string;
    password: string;
    role: Role;
}
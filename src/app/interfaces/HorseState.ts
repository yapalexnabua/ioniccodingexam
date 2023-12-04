import { Horse } from "./Horse";
import { Status } from "./Status";

export interface HorseState {
    horses: Horse[];
    error: string | null;
    status: Status;
}
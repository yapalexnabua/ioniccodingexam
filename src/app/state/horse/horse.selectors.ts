import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/interfaces/AppState";
import { HorseState } from "src/app/interfaces/HorseState";

export const selectHorses = (state: AppState) => state.horses;
export const selectAllHorses = createSelector(
    selectHorses,
    (state: HorseState) => state.horses
);

export const selectError = createSelector(
    selectHorses,
    (state) => state.error
);

export const selectStatus = createSelector(
    selectHorses,
    (state) => state.status
);

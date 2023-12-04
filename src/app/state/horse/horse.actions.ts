import { createAction, props } from "@ngrx/store";
import { HorseFilters } from "src/app/interfaces/HorseFilters";
import { Horse } from "src/app/interfaces/Horse";

export const addHorse = createAction(
    '[Home Page] Add Horse',
props<{ name: string; jockey: string; trainer: string; age: number; }>()
);

export const updateHorse = createAction(
    '[Home Page] Update Horse',
    props<{ id: string; name: string; jockey: string; trainer: string; age: number; }>()
);

export const removeHorse = createAction(
    '[Home Page] Remove Horse',
    props<{ id: string }>()
);

export const favoriteHorse = createAction(
    '[Home Page] Favorite Horse',
    props<{ id: string, is_favorite: boolean }>()
);

export const loadHorses = createAction(
    '[Home Page] Load Horses'
);

export const loadHorsesSuccess = createAction(
    '[Home Page] Load Horses Success',
    props<{ horses: Horse[] }>()
);

export const loadHorsesFailure = createAction(
    '[Home Page] Load Horses Failure',
    props<{error: string}>()
);

export const filterHorses = createAction(
    '[Home Page] Filter Horses',
    props<{filters: HorseFilters}>()
);

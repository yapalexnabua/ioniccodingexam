import { createReducer, on } from "@ngrx/store";
import { Status } from "src/app/interfaces/Status";
import { addHorse, favoriteHorse, filterHorses, loadHorses, loadHorsesFailure, loadHorsesSuccess, removeHorse, updateHorse } from "./horse.actions";
import { HorseState } from "src/app/interfaces/HorseState";

export const initialState: HorseState = {
    horses: [],
    error: null,
    status: Status.Pending
}

export const horseReducer = createReducer(
    initialState,
    on(addHorse, (state, { name, jockey, trainer, age }) => ({
        ...state,
        horses: [
            ...state.horses,
            {
                name,
                jockey,
                trainer,
                is_favorite: false,
                deleted_at: null,
                age,
                id: Date.now().toString(),
            }
        ]
    })),
    on(removeHorse, (state, { id }) => ({
        ...state,
        horses: state.horses.filter((horse) => horse.id !== id)
    })),
    on(updateHorse, (state, { id, name, jockey, trainer }) => {
        const index = state.horses.findIndex((value) => value.id === id);

        if (index > -1) {
            return {
                ...state,
                horses: [
                    ...state.horses.slice(0, index),
                    {
                        ...state.horses[index],
                        name,
                        jockey,
                        trainer
                    },
                    ...state.horses.slice(index + 1),
                ]
            }
        }

        return state;
    }),
    on(favoriteHorse, (state, { id, is_favorite }) => {
        const index = state.horses.findIndex((value) => value.id === id);

        if (index > -1) {
            return {
                ...state,
                horses: [
                    ...state.horses.slice(0, index),
                    {
                        ...state.horses[index],
                        is_favorite
                    },
                    ...state.horses.slice(index + 1),
                ]
            }
        }

        return state;
    }),
    on(loadHorses, (state) => ({
        ...state,
        status: Status.Loading
    })),
    on(loadHorsesSuccess, (state, { horses }) => ({
        ...state,
        horses,
        error: null,
        status: Status.Succcess
    })),
    on(loadHorsesFailure, (state, { error }) => ({
        ...state,
        horses: [],
        error,
        status: Status.Error
    })),
    on(filterHorses, (state, { filters }) => ({
        ...state,
        horses: state.horses.filter((horse) => {
            for (const key in filters) {
                if (key === null) {
                    continue;
                }

                if (['name', 'jockey', 'trainer'].includes(key)) {
                    return (horse[key] as string)?.includes(filters[key] as string);
                }

                if (key === 'level') {
                    switch (filters[key]) {
                        case '1':
                            return horse.age < 10;
                        case '2':
                            return horse.age < 20;
                        case '3':
                            return horse.age >= 20;
                    }
                }
            }

            return true;
        })
    }))
);
import { Injectable, OnInit } from "@angular/core";
import { Actions, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { Storage } from '@ionic/storage-angular';
import { addHorse, loadHorses, loadHorsesFailure, loadHorsesSuccess } from "./horse.actions";
import { selectAllHorses } from "./horse.selectors";
import { Store } from "@ngrx/store";
import { Horse } from "src/app/interfaces/Horse";
import { AppState } from "../app.state";
import { HorseService } from "src/app/services/horse/horse.service";

@Injectable()
export class HorseEffects implements OnInit {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private storage: Storage,
        private horseService: HorseService
    ) {}

    async ngOnInit() {
        await this.storage.create();
    }

    loadHorses$ = this.actions$.pipe(
        ofType(loadHorses),
        switchMap(() => 
            from(this.horseService.getHorses()).pipe(
                map((horses: Horse[]) => loadHorsesSuccess({ horses })),
                catchError((error) => of(loadHorsesFailure({ error })))
            )
        )
    );

    addHorse$ = this.actions$.pipe(
        ofType(addHorse),
        withLatestFrom(this.store.select(selectAllHorses)),
        tap(async ([_, horses]) => {
            await this.storage.set('horses', JSON.stringify(horses));
        })
    );
}

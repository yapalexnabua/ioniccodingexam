import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/AppState';
import { Level } from 'src/app/interfaces/HorseFilters';
import { filterHorses, loadHorses } from 'src/app/state/horse/horse.actions';
import { selectAllHorses } from 'src/app/state/horse/horse.selectors';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.scss'],
})
export class HorseListComponent  implements OnInit {
  fb = new FormGroup({
    name: new FormControl<string>(''),
    jockey: new FormControl<string>(''),
    trainer: new FormControl<string>(''),
    level: new FormControl<Level | null>(null)
  });

  horses$ = this.store.select(selectAllHorses);

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(loadHorses());
  }

  search = () => {
    const { name, jockey, trainer, level } = this.fb.value;
    this.store.dispatch(filterHorses({
      filters: {
        name: name || null,
        jockey: jockey || null,
        trainer: trainer || null,
        level: level || null
      }
    }));
  }
}

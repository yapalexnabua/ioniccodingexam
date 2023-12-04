import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Horse } from 'src/app/interfaces/Horse';
import { removeHorse } from 'src/app/state/horse/horse.actions';

@Component({
  selector: 'app-horse-list-item',
  templateUrl: './horse-list-item.component.html',
  styleUrls: ['./horse-list-item.component.scss'],
})
export class HorseListItemComponent  implements OnInit {
  @Input() horse!: Horse;

  constructor(private store: Store) { }

  ngOnInit() {}

  remove = (id: string) => {
    this.store.dispatch(removeHorse({ id }));
  }
}

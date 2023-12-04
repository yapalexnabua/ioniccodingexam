import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Horse } from 'src/app/interfaces/Horse';
import { addHorse, updateHorse } from 'src/app/state/horse/horse.actions';
import { horseAgeValidator } from 'src/app/validators/horse-age-validator';

@Component({
  selector: 'app-horse-form',
  templateUrl: './horse-form.component.html',
  styleUrls: ['./horse-form.component.scss'],
})
export class HorseFormComponent  implements OnInit {
  @Input() horse?: Horse;

  fb = new FormGroup({
    name: new FormControl<string>(this.horse?.name || '', [
      Validators.required
    ]),
    jockey: new FormControl<string>(this.horse?.jockey || '', [
      Validators.required
    ]),
    trainer: new FormControl<string>(this.horse?.trainer || '', [
      Validators.required
    ]),
    age: new FormControl<number>(this.horse?.age || 0, [
      Validators.required,
      Validators.pattern(/^[0-9]\d*$/)
    ])
  }, {
    validators: horseAgeValidator
  });

  constructor(private store: Store) { }

  ngOnInit() {}

  submit = () => {
    const { name, jockey, trainer, age } = this.fb.value;
    
    if (this.horse) {
      this.store.dispatch(updateHorse({ id: this.horse!.id, name: name!, jockey: jockey!, trainer: trainer!, age: age! }));
    } else {
      this.store.dispatch(addHorse({ name: name!, jockey: jockey!, trainer: trainer!, age: age! }));
    }
  }
}
